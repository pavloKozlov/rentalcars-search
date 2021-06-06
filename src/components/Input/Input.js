import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';
import withValueOnChange from '../../hoc/withValueOnChange';

/**
 * Input component.
 */
const Input = ({ id, value, name, placeholder, onChange, onFocus, onBlur }) => (
  <input
    id={id}
    name={name}
    value={value}
    className="input"
    placeholder={placeholder}
    area-label={placeholder}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    autoComplete="false"
  />
);

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default withValueOnChange(Input);
