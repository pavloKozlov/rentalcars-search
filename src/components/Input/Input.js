import React from 'react';
import PropTypes from 'prop-types';
import classnames from '../../utils/classnames';
import './Input.scss';
import withValueOnChange from '../../hoc/withValueOnChange';

/**
 * Component that render input element.
 */
const Input = ({
  id,
  value,
  name,
  placeholder,
  className,
  activedescendant,
  onChange,
  onFocus,
  onBlur,
}) => (
  <input
    id={id}
    name={name}
    value={value}
    className={classnames(['input', className])}
    placeholder={placeholder}
    area-label={placeholder}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    autoComplete="false"
    aria-activedescendant={activedescendant}
  />
);

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  activedescendant: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  className: '',
};

export default withValueOnChange(Input);
