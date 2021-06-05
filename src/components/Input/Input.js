import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';
import withValueOnChange from '../../hoc/withValueOnChange';

/**
 * Input component.
 */
const Input = ({ id, value, name, placeholder, onChange }) => (
  <input
    id={id}
    name={name}
    value={value}
    className="input"
    placeholder={placeholder}
    area-label={placeholder}
    onChange={onChange}
    autoComplete="false"
  />
);

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default withValueOnChange(Input);
