import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import useDebounce from '../../hooks/useDebounce';
import AutocompleteInput from './AutocompleteInput';

const AutocompleteInputContainer = ({ onChange }) => {
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

  return <AutocompleteInput value={inputValue} onChange={onValueChange} />;
};

AutocompleteInputContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default AutocompleteInputContainer;
