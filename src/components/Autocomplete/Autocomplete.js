import React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';

const Autocomplete = ({ value, onChange }) => (
  <Input placeholder="Pick-up Location" value={value} onChange={onChange} />
);

Autocomplete.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Autocomplete;
