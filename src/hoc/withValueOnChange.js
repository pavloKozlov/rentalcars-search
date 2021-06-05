import React, { useCallback } from 'react';

/**
 * High Order Component that converts event.target.value to value for onChange callback.
 */
const withValueOnChange = (Component) => {
  function InnerComponent({ onChange, ...props }) {
    const memoizedOnChange = useCallback(
      (event) => {
        onChange(event.target.value);
      },
      [onChange]
    );

    return (
      <Component
        {...{
          ...props,
          onChange: memoizedOnChange,
        }}
      />
    );
  }
  InnerComponent.propTypes = Comment.propTypes;

  return InnerComponent;
};

export default withValueOnChange;
