import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

const AutocompleteInput = ({ value, className, onChange, onFocus, onBlur }) => (
  <Input
    placeholder="Pick-up Location"
    value={value}
    className={className}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
  />
);

AutocompleteInput.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default AutocompleteInput;
