/*!
 * Built by Revolist
 */
import { h } from '@stencil/core';
export const FILTER_BUTTON_CLASS = 'rv-filter';
export const FILTER_BUTTON_ACTIVE = 'active';
export const SortingSign = ({ column }) => {
  var _a;
  return h("i", { class: (_a = column === null || column === void 0 ? void 0 : column.order) !== null && _a !== void 0 ? _a : 'sort-off' });
};
