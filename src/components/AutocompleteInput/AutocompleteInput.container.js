import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useDebounce from '../../hooks/useDebounce';
import AutocompleteInput from './AutocompleteInput';

const AutocompleteInputContainer = ({
  displayValue,
  onChange,
  onFocus,
  onBlur,
}) => {
  const [inputValue, setInputValue] = useState(displayValue);

  useEffect(() => {
    setInputValue(displayValue);
  }, [displayValue]);

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

  return (
    <AutocompleteInput
      value={inputValue}
      onChange={onValueChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

AutocompleteInputContainer.propTypes = {
  displayValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default AutocompleteInputContainer;
