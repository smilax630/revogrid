import { RevoGrid } from '../../interfaces';
export declare type DimensionDataViewport = Pick<RevoGrid.DimensionSettingsState, 'indexes' | 'positionIndexes' | 'positionIndexToItem' | 'sizes' | 'originItemSize' | 'realSize' | 'frameOffset'>;
declare type ItemsToUpdate = Pick<RevoGrid.ViewportStateItems, 'items' | 'start' | 'end'>;
/**
 * Update items based on new scroll position
 * If viewport wasn't changed fully simple recombination of positions
 * Otherwise rebuild viewport items
 */
export declare function getUpdatedItemsByPosition<T extends ItemsToUpdate>(pos: number, // coordinate
items: T, realCount: number, virtualSize: number, dimension: DimensionDataViewport): ItemsToUpdate;
export declare function updateMissingAndRange(items: RevoGrid.VirtualPositionItem[], missing: RevoGrid.VirtualPositionItem[], range: RevoGrid.Range): void;
/**
 * If partial replacement
 * this function adds items if viewport has some space left
 */
export declare function addMissingItems<T extends ItemsToUpdate>(firstItem: RevoGrid.PositionItem, realCount: number, virtualSize: number, existingCollection: T, dimension: Pick<RevoGrid.DimensionSettingsState, 'sizes' | 'originItemSize'>): RevoGrid.VirtualPositionItem[];
/**
 * Get wiewport items parameters
 * caching position and calculating items count in viewport
 */
export declare function getItems(opt: {
  firstItemIndex: number;
  firstItemStart: number;
  origSize: number;
  maxSize: number;
  maxCount: number;
  sizes?: RevoGrid.ViewSettingSizeProp;
}, currentSize?: number): RevoGrid.VirtualPositionItem[];
/**
 * Do batch items recombination
 * If items not overlapped with existing viewport returns null
 */
export declare function recombineByOffset(offset: number, data: {
  positiveDirection: boolean;
} & ItemsToUpdate & Pick<RevoGrid.DimensionSettingsState, 'sizes' | 'realSize' | 'originItemSize'>): ItemsToUpdate | null;
/**
 * Verify if position is in range of the PositionItem, start and end are included
 */
export declare function isActiveRange(pos: number, realSize: number, first?: RevoGrid.PositionItem, last?: RevoGrid.PositionItem): boolean;
export declare function isActiveRangeOutsideLastItem(pos: number, virtualSize: number, firstItem?: RevoGrid.PositionItem, lastItem?: RevoGrid.PositionItem): boolean;
export declare function getFirstItem(s: ItemsToUpdate): RevoGrid.VirtualPositionItem | undefined;
export declare function getLastItem(s: ItemsToUpdate): RevoGrid.VirtualPositionItem;
/**
 * Set items sizes from start index to end
 * @param vpItems
 * @param start
 * @param size
 * @param lastCoordinate
 * @returns
 */
export declare function setItemSizes(vpItems: RevoGrid.VirtualPositionItem[], initialIndex: number, size: number, lastCoordinate: number): RevoGrid.VirtualPositionItem[];
export {};
