import React, { useCallback, useEffect, useState } from 'react';
import SearchService from '../../services/SearchService';
import Search from './Search';

const SearchContainer = () => {
  const [results, setResults] = useState([]);
  const onChange = useCallback((value) => {
    SearchService.searchLocations(value).then((data) => setResults(data));
  }, []);

  const onChooseResult = useCallback((result) => {
    console.log({ result });
  }, []);

  useEffect(() => {
    onChange('ams');
  }, []);

  return (
    <Search
      results={results}
      onChange={onChange}
      onChooseResult={onChooseResult}
    />
  );
};

export default SearchContainer;
