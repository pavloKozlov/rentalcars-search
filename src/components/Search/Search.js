import React from 'react';
import PropTypes from 'prop-types';
import AutocompleteInput from '../AutocompleteInput';
import ResultsList from '../ResultsList';

const Search = ({ results, onChange }) => (
  <div>
    <AutocompleteInput onChange={onChange} />
    <ResultsList values={results} />
  </div>
);

Search.propTypes = {
  results: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

Search.defaultProps = {
  results: [],
};

export default Search;
