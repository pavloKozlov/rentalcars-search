import React, { useCallback, useEffect, useState } from 'react';
import SearchService from '../../services/SearchService';
import Search from './Search';

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

const SearchContainer = () => {
  const [results, setResults] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const [isResultsVisible, setIsResultsVisible] = useState(false);

  const onChange = useCallback((value) => {
    if (value.length < 2) {
      if (value.length === 0) {
        setResults([]);
      }
      setIsResultsVisible(false);
    } else {
      SearchService.searchLocations(value).then((data) => {
        setResults(data);
        setIsResultsVisible(true);
      });
    }
  }, []);

  const onFocus = useCallback(() => {
    setIsResultsVisible(true);
  }, []);

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

  useEffect(() => {
    onChange('ams');
  }, []);

  return (
    <Search
      results={results}
      displayValue={formatInputValue(selectedValue)}
      isResultsVisible={isResultsVisible}
      onChange={onChange}
      onChooseResult={onChooseResult}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default SearchContainer;
