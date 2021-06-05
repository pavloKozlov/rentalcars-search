import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

const AutocompleteInput = ({ value, onChange }) => (
  <Input placeholder="Pick-up Location" value={value} onChange={onChange} />
);

AutocompleteInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default AutocompleteInput;
