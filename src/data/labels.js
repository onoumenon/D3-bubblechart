export const activeLabel = "all";

// Labels below should have the same names as the category you want to sort by.
export const selectors = {
  attr: ["name", "price", "stall", "location"],
  radiusIndex: 1,
  colorIndex: 2,
  tooltipIndex: [0, 1],
  sortingLabelsIndex: [2, 3]
};
export const labels = selectors.sortingLabelsIndex.map(i => selectors.attr[i]);
