import DimensionStore from '../store/dimension/dimension.store';
import ViewportProvider from './viewport.provider';
import { RevoGrid } from '../interfaces';
export declare type ColumnItems = Record<RevoGrid.DimensionCols, RevoGrid.ColumnRegular[]>;
export declare type DimensionStores = {
  [T in RevoGrid.MultiDimensionType]: DimensionStore;
};
export default class DimensionProvider {
  private viewports;
  readonly stores: DimensionStores;
  constructor(viewports: ViewportProvider);
  setDimensionSize(dimensionType: RevoGrid.MultiDimensionType, sizes: RevoGrid.ViewSettingSizeProp): void;
  setRealSize(realCount: number, type: RevoGrid.MultiDimensionType): void;
  /**
   * Apply new custom sizes to dimension and view port
   * @param type - dimension type
   * @param sizes - new custom sizes
   * @param keepOld - keep old sizes merge new with old
   */
  setCustomSizes(type: RevoGrid.MultiDimensionType, sizes: RevoGrid.ViewSettingSizeProp, keepOld?: boolean): void;
  /**
   * Sets dimension data and view port coordinate
   * @param items - data/column items
   * @param type - dimension type
   */
  setData(items: RevoGrid.ColumnRegular[] | RevoGrid.DataType[], type: RevoGrid.MultiDimensionType, noVirtual?: boolean): void;
  private setNoVirtual;
  dropColumns(): void;
  setColumns(type: RevoGrid.MultiDimensionType, newLength: number, sizes?: RevoGrid.ViewSettingSizeProp, noVirtual?: boolean): void;
  setViewPortCoordinate({ coordinate, type }: {
    coordinate: number;
    type: RevoGrid.MultiDimensionType;
  }): void;
  getViewPortPos(e: RevoGrid.ViewPortScrollEvent): number;
  setSettings(data: Partial<RevoGrid.DimensionSettingsState>, dimensionType: RevoGrid.DimensionType): void;
}
