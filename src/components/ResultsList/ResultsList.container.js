import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useKeyPress from '../../hooks/useKeyPress';
import ResultsList from './ResultsList';

const ResultsListContainer = ({ values, emptyMessage, onChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const onItemClick = useCallback(
    (event) => {
      const listItem = event.target.closest(
        '.results-list__list > .results-list-item'
      );
      if (listItem) {
        const idx = listItem.getAttribute('data-idx');
        setSelectedIndex(+idx);
      }
    },
    [setSelectedIndex]
  );

  useKeyPress(
    (event) => {
      const { keyCode } = event;
      let idx = selectedIndex;
      switch (keyCode) {
        case 40:
          // down key
          idx++;
          break;
        case 38:
          // up key
          idx--;
          break;
        case 13:
          // enter key
          onChange(values[idx]);
          break;
        default:
      }
      const newIdx = (idx + values.length) % values.length;
      setSelectedIndex(newIdx);
    },
    [selectedIndex, onChange]
  );

  useEffect(() => {
    setSelectedIndex(values.length > 0 ? 0 : -1);
  }, [values]);

  return (
    <ResultsList
      values={values}
      selectedIndex={selectedIndex}
      emptyMessage={emptyMessage}
      onItemClick={onItemClick}
    />
  );
};

ResultsListContainer.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
  emptyMessage: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ResultsListContainer;
