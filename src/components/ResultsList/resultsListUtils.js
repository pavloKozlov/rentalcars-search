/**
 * Gets result list element index that is related to the event.
 * The index is retrieved from `data-idx` attribute of element with `results-list-item` css class name.
 *
 * @param {SyntheticEvent} event  The react `SyntheticEvent`.
 * @returns {number} The element index or -1 if element can't be indentified from the event.
 */
const getOptionIndexFromEvent = (event) => {
  const listItem = event.target.closest(
    '.results-list__list > .results-list-item'
  );
  return listItem ? +listItem.getAttribute('data-idx') : -1;
};

export { getOptionIndexFromEvent };
