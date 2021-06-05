import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';
import withValueOnChange from '../../hoc/withValueOnChange';

/**
 * Input component.
 */
const Input = ({ id, name, placeholder, onChange }) => (
  <input
    id={id}
    name={name}
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
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default withValueOnChange(Input);
