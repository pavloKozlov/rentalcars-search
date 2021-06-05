import React, { useCallback, useState } from 'react';
import Search from './Search';

const SearchContainer = () => {
  const [results] = useState([]);
  const onChange = useCallback((value) => {
    console.log({ value });
  }, []);
  return <Search results={results} onChange={onChange} />;
};

export default SearchContainer;
