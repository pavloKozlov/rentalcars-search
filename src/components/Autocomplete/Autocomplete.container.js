import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import useDebounce from '../../hooks/useDebounce';
import Autocomplete from './Autocomplete';

const AutocompleteContainer = ({ onChange }) => {
  const [inputValue, setInputValue] = useState('');

  /**
   * Call onChange with debounce.
   */
  const debouncedOnChange = useDebounce((value) => {
    onChange(value);
  }, 500);

  const onValueChange = useCallback(
    (value) => {
      setInputValue(value);
      debouncedOnChange(value);
    },
    [setInputValue, debouncedOnChange]
  );

  return <Autocomplete value={inputValue} onChange={onValueChange} />;
};

AutocompleteContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default AutocompleteContainer;
