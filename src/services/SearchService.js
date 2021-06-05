const NUMBER_OF_RESULTS = 6;

const searchLocations = (searchTerm) =>
  fetch(
    `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=${NUMBER_OF_RESULTS}&solrTerm=${searchTerm}`
  )
    .then((result) => result.json())
    .then((data) => data.results.docs)
    .catch((e) => console.error(e));

export default { searchLocations };
