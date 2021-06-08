import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { getOptionIndexFromEvent } from './resultsListUtils';
import ResultsList from './ResultsList';

/**
 * Container component for search results list.
 */
const ResultsListContainer = ({
  values,
  selectedIndex,
  emptyMessage,
  className,
  optionIdPrefix,
  onChange,
  onSelectionChange,
}) => {
  const onItemClick = useCallback(
    (event) => {
      const index = getOptionIndexFromEvent(event);
      if (index > -1) {
        onSelectionChange(index);
        onChange(values[index]);
      }
    },
    [values, onChange, onSelectionChange]
  );

  const onItemHover = useCallback(
    (event) => {
      const index = getOptionIndexFromEvent(event);
      if (index > -1) {
        onSelectionChange(index);
      }
    },
    [onSelectionChange]
  );

  return (
    <ResultsList
      values={values}
      selectedIndex={selectedIndex}
      emptyMessage={emptyMessage}
      className={className}
      optionIdPrefix={optionIdPrefix}
      onItemClick={onItemClick}
      onItemHover={onItemHover}
    />
  );
};

ResultsListContainer.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
  selectedIndex: PropTypes.number,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
  optionIdPrefix: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
};

ResultsListContainer.defaultProps = {
  emptyMessage: '',
  className: '',
};

export default ResultsListContainer;
