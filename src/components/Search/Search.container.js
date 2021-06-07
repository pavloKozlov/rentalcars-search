import React, { useCallback, useState } from 'react';
import SearchService from '../../services/SearchService';
import { formatInputValue } from './searchUtils';
import Search from './Search';

const MIN_CHARS_TO_SEARCH = 2;

/**
 * Container component for search.
 */
const SearchContainer = () => {
  const [results, setResults] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = useCallback((value) => {
    if (value.length < MIN_CHARS_TO_SEARCH) {
      if (value.length === 0) {
        setResults([]);
      }
      setIsResultsVisible(false);
    } else {
      setIsLoading(true);
      SearchService.searchLocations(value)
        .then((data) => {
          setResults(data);
          setIsResultsVisible(true);
        })
        .catch(() => {
          // handle error
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  const onSelectionChange = useCallback(
    (value) => {
      setSelectedIndex(value);
    },
    [setSelectedIndex]
  );

  const onFocus = useCallback(
    (event) => {
      const value = event.target.value;
      if (value.length >= MIN_CHARS_TO_SEARCH) {
        setIsResultsVisible(true);
      }
    },
    [setIsResultsVisible]
  );

  const onBlur = useCallback(() => {
    // use timeout to let onChange fire first
    setTimeout(() => setIsResultsVisible(false), 100);
  }, []);

  const onChooseResult = useCallback(
    (result) => {
      console.log({ result });
      setSelectedValue(result);
      setIsResultsVisible(false);
    },
    [setSelectedValue, setIsResultsVisible]
  );

  return (
    <Search
      results={results}
      displayValue={formatInputValue(selectedValue)}
      isResultsVisible={isResultsVisible}
      selectedIndex={selectedIndex}
      isLoading={isLoading}
      onChange={onChange}
      onChooseResult={onChooseResult}
      onFocus={onFocus}
      onBlur={onBlur}
      onSelectionChange={onSelectionChange}
    />
  );
};

export default SearchContainer;
