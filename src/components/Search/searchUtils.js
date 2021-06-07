/**
 * Formtats search result item to string.
 *
 * @param {SearchResult} value - The search result item.
 * @param {string} The formatted result item.
 */
const formatInputValue = (value) => {
  if (!value) {
    return '';
  }
  return [
    value.iata ? `${value.name} (${value.iata})` : value.name,
    value.city,
    value.country,
  ]
    .filter((val) => !!val)
    .join(', ');
};

export { formatInputValue };
