import React from 'react';
import PropTypes from 'prop-types';
import AutocompleteInput from '../AutocompleteInput';
import ResultsList from '../ResultsList';
import LocationIcon from '../../assets/icons/location-icon.svg';
import LoadingIndicator from '../LoadingIndicator';
import './Search.scss';

const Search = ({
  results,
  displayValue,
  isResultsVisible,
  isLoading,
  onChange,
  onChooseResult,
  onFocus,
  onBlur,
}) => (
  <div className="search">
    <div className="search__input-container">
      <span className="search__location-icon">
        <LocationIcon />
      </span>
      <AutocompleteInput
        displayValue={displayValue}
        className="search__input"
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {isLoading && (
        <div className="search__loading-indicator">
          <LoadingIndicator />
        </div>
      )}
    </div>
    {isResultsVisible && (
      <ResultsList
        className="search__results"
        values={results}
        emptyMessage="No results found."
        onChange={onChooseResult}
      />
    )}
  </div>
);

Search.propTypes = {
  results: PropTypes.array,
  displayValue: PropTypes.string,
  isResultsVisible: PropTypes.bool,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onChooseResult: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Search.defaultProps = {
  results: [],
};

export default Search;
