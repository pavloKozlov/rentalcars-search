import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useKeyPress from '../../hooks/useKeyPress';
import ResultsList from './ResultsList';

const ResultsListContainer = ({
  values,
  emptyMessage,
  className,
  optionIdPrefix,
  onChange,
  onSelectionChange,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = useCallback(
    (index) => {
      setSelectedIndex(index);
      onSelectionChange(index);
    },
    [setSelectedIndex, onSelectionChange]
  );

  const onItemClick = useCallback(
    (event) => {
      const listItem = event.target.closest(
        '.results-list__list > .results-list-item'
      );
      if (listItem) {
        const idx = +listItem.getAttribute('data-idx');
        selectItem(idx);
        onChange(values[idx]);
      }
    },
    [values, setSelectedIndex, onChange, selectItem]
  );

  useKeyPress(
    (event) => {
      const { keyCode } = event;
      let idx = selectedIndex;
      switch (keyCode) {
        case 13: // enter
        case 32: // space
          onChange(values[idx]);
          break;
        case 40: // arrow down
          idx++;
          break;
        case 38: // arrow up
          idx--;
          break;
        default:
      }
      const newIdx = (idx + values.length) % values.length;
      selectItem(newIdx);
    },
    [selectedIndex, onChange]
  );

  useEffect(() => {
    selectItem(values.length > 0 ? 0 : -1);
  }, [values]);

  return (
    <ResultsList
      values={values}
      selectedIndex={selectedIndex}
      emptyMessage={emptyMessage}
      className={className}
      optionIdPrefix={optionIdPrefix}
      onItemClick={onItemClick}
    />
  );
};

ResultsListContainer.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
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
