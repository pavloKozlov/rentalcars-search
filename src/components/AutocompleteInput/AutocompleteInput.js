import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

/**
 * Component that renders autocomplete input.
 */
const AutocompleteInput = ({
  value,
  className,
  activedescendant,
  onChange,
  onFocus,
  onBlur,
}) => (
  <Input
    placeholder="Pick-up Location"
    value={value}
    className={className}
    activedescendant={activedescendant}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
  />
);

AutocompleteInput.propTypes = {
  value: PropTypes.string,
  className: PropTypes.string,
  activedescendant: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default AutocompleteInput;
