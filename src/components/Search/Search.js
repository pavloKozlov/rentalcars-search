import React from 'react';
import PropTypes from 'prop-types';
import AutocompleteInput from '../AutocompleteInput';
import ResultsList from '../ResultsList';
import LocationIcon from '../../assets/icons/location-icon.svg';
import LoadingIndicator from '../LoadingIndicator';
import './Search.scss';

const OPTION_ID_PREFIX = 'location-item-';

/**
 * Component that renders search.
 */
const Search = ({
  results,
  displayValue,
  isResultsVisible,
  selectedIndex,
  isLoading,
  onChange,
  onChooseResult,
  onFocus,
  onBlur,
  onSelectionChange,
}) => (
  <div className="search">
    <div className="search__input-container">
      <span className="search__location-icon">
        <LocationIcon />
      </span>
      <AutocompleteInput
        displayValue={displayValue}
        className="search__input"
        activedescendant={
          isResultsVisible ? `${OPTION_ID_PREFIX}${selectedIndex}` : null
        }
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
        optionIdPrefix={OPTION_ID_PREFIX}
        onChange={onChooseResult}
        onSelectionChange={onSelectionChange}
      />
    )}
  </div>
);

Search.propTypes = {
  results: PropTypes.array,
  displayValue: PropTypes.string,
  isResultsVisible: PropTypes.bool,
  isLoading: PropTypes.bool,
  selectedIndex: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onChooseResult: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onSelectionChange: PropTypes.func,
};

Search.defaultProps = {
  results: [],
};

export default Search;
