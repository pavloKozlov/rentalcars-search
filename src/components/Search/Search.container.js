import React, { useCallback, useState } from 'react';
import SearchService from '../../services/SearchService';
import useKeyPress from '../../hooks/useKeyPress';
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
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = useCallback((value) => {
    if (value.length < MIN_CHARS_TO_SEARCH) {
      if (value.length === 0) {
        setResults([]);
      }
      setIsResultsVisible(false);
    } else {
      setIsLoading(true);
      // Using promise inside react component is not the best practice
      // The promise could be resolved or rejected by the time component is unmounted,
      // thus react will not be able to set state on unmounted component
      // there are better ways deal with it
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

  const onSelectionChange = useCallback((value) => {
    setSelectedIndex(value);
  }, []);

  const onFocus = useCallback((event) => {
    const value = event.target.value;
    if (value.length >= MIN_CHARS_TO_SEARCH) {
      setIsResultsVisible(true);
    }
  }, []);

  const onBlur = useCallback(() => {
    // use timeout to let onChange fire first
    setTimeout(() => setIsResultsVisible(false), 100);
  }, []);

  const onChooseResult = useCallback((result) => {
    console.log({ result });
    setSelectedValue(result);
    setIsResultsVisible(false);
  }, []);

  useKeyPress(
    (event) => {
      if (!isResultsVisible) {
        // if results are not visible -> do nothing
        return;
      }
      const { keyCode } = event;
      switch (keyCode) {
        case 27: // esc
          setIsResultsVisible(false); // hide results list
          break;
        case 40: // arrow down
          event.preventDefault(); // prevent from chaning cursor position in the input
          break;
        case 38: // arrow up
          event.preventDefault(); // prevent from chaning cursor position in the input
          break;
        default:
      }
    },
    [isResultsVisible]
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
