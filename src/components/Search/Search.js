import React from 'react';
import PropTypes from 'prop-types';
import AutocompleteInput from '../AutocompleteInput';
import ResultsList from '../ResultsList';

const Search = ({
  results,
  displayValue,
  isResultsVisible,
  onChange,
  onChooseResult,
  onFocus,
  onBlur,
}) => (
  <div>
    <AutocompleteInput
      displayValue={displayValue}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
    {isResultsVisible && (
      <ResultsList values={results} onChange={onChooseResult} />
    )}
  </div>
);

Search.propTypes = {
  results: PropTypes.array,
  displayValue: PropTypes.string,
  isResultsVisible: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onChooseResult: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Search.defaultProps = {
  results: [],
};

export default Search;
