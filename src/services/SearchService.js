const NUMBER_OF_RESULTS = 6;

/**
 * Service to search for locations based on the search term.
 *
 * @param {string} searchTerm - The search string.
 * @returns {Promise} Promise that represents api request.
 */
const searchLocations = (searchTerm) =>
  fetch(
    `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${NUMBER_OF_RESULTS}&solrTerm=${searchTerm}`
  )
    .then((result) => result.json())
    .then((data) => {
      const result = data.results.docs;
      if (result.length > 0 && result[0].placeKey === undefined) {
        // If there is no data -> return empty array, not an array with "no data" item
        return [];
      }
      return result;
    })
    .catch((e) => console.error(e));

export default { searchLocations };
