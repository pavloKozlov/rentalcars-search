import React from 'react';
import PropTypes from 'prop-types';
import AutocompleteInput from '../AutocompleteInput';
import ResultsList from '../ResultsList';

const Search = ({ results, onChange, onChooseResult }) => (
  <div>
    <AutocompleteInput onChange={onChange} />
    <ResultsList values={results} onChange={onChooseResult} />
  </div>
);

Search.propTypes = {
  results: PropTypes.array,
  onChange: PropTypes.func.isRequired,
  onChooseResult: PropTypes.func.isRequired,
};

Search.defaultProps = {
  results: [],
};

export default Search;
