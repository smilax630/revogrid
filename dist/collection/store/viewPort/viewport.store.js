/*!
 * Built by Revolist
 */
/**
 * Store is responsible for visible
 * Viewport information for each dimension
 * Redraw items during scrolling
 */
import { createStore } from '@stencil/store';
import { addMissingItems, getFirstItem, getLastItem, getUpdatedItemsByPosition, isActiveRange, isActiveRangeOutsideLastItem, setItemSizes, updateMissingAndRange } from './viewport.helpers';
import { setStore } from '../../utils/store.utils';
function initialState() {
  return {
    // virtual item information per rendered item
    items: [],
    // virtual dom item order to render
    start: 0,
    end: 0,
    // size of viewport in px
    virtualSize: 0,
    // total number of items
    realCount: 0,
    // last coordinate for store position restore
    lastCoordinate: 0,
  };
}
export default class ViewportStore {
  constructor() {
    this.store = createStore(initialState());
    this.store.onChange('realCount', () => this.clear());
  }
  /** Render viewport based on coordinate, this is main method for draw */
  setViewPortCoordinate(position, dimension) {
    let virtualSize = this.store.get('virtualSize');
    // no visible data to calculate
    if (!virtualSize) {
      return;
    }
    const frameOffset = dimension.frameOffset;
    const singleOffsetInPx = dimension.originItemSize * frameOffset;
    // add offset to virtual size from both sides
    const outsize = singleOffsetInPx * 2;
    virtualSize += outsize;
    // expected no scroll if real size less than virtual size, position is 0
    let maxCoordinate = 0;
    // if there is nodes outside of viewport, max coordinate has to be adjusted
    if (dimension.realSize > virtualSize) {
      // max coordinate is real size minus virtual/rendered space
      maxCoordinate = dimension.realSize - virtualSize;
    }
    let toUpdate = {
      lastCoordinate: position,
    };
    let pos = position;
    pos -= singleOffsetInPx;
    pos = pos < 0 ? 0 : pos < maxCoordinate ? pos : maxCoordinate;
    const allItems = this.getItems();
    const firstItem = getFirstItem(allItems);
    const lastItem = getLastItem(allItems);
    // left position changed
    // verify if new position is in range of previously rendered first item
    if (!isActiveRange(pos, dimension.realSize, firstItem, lastItem)) {
      toUpdate = Object.assign(Object.assign({}, toUpdate), getUpdatedItemsByPosition(pos, allItems, this.store.get('realCount'), virtualSize, dimension));
      this.setViewport(Object.assign({}, toUpdate));
      // right position changed
    }
    else if (isActiveRangeOutsideLastItem(pos, virtualSize, firstItem, lastItem)) {
      // check is any item missing for full fill content
      const missing = addMissingItems(firstItem, this.store.get('realCount'), virtualSize + pos - firstItem.start, allItems, dimension);
      // update missing items
      if (missing.length) {
        const items = [...this.store.get('items')];
        const range = {
          start: this.store.get('start'),
          end: this.store.get('end'),
        };
        updateMissingAndRange(items, missing, range);
        toUpdate = Object.assign(Object.assign(Object.assign({}, toUpdate), { items: [...items] }), range);
        this.setViewport(Object.assign({}, toUpdate));
      }
    }
  }
  /** Update viewport sizes */
  setViewPortDimension(sizes, dropToOriginalSize) {
    let items = this.store.get('items');
    const count = items.length;
    // viewport not inited
    if (!count) {
      return;
    }
    let changedCoordinate = 0;
    let i = 0;
    let start = this.store.get('start');
    // drop to original size if requested
    if (dropToOriginalSize) {
      items = setItemSizes(items, start, dropToOriginalSize, this.store.get('lastCoordinate'));
    }
    // loop through array from initial item after recombination
    while (i < count) {
      const item = items[start];
      // change pos if size change present before
      if (changedCoordinate) {
        item.start += changedCoordinate;
        item.end += changedCoordinate;
      }
      // change size
      const size = sizes[item.itemIndex];
      if (size) {
        const changedSize = size - item.size;
        changedCoordinate += changedSize;
        item.size = size;
        item.end = item.start + size;
      }
      // loop by start index
      start++;
      i++;
      if (start === count) {
        start = 0;
      }
    }
    this.setViewport({ items: [...items] });
  }
  getItems() {
    return {
      items: this.store.get('items'),
      start: this.store.get('start'),
      end: this.store.get('end'),
    };
  }
  setViewport(data) {
    setStore(this.store, data);
  }
  clear() {
    this.store.set('items', []);
  }
}
