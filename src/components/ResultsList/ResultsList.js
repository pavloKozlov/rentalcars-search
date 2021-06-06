import React from 'react';
import PropTypes from 'prop-types';
import classnames from '../../utils/classnames';
import ResultItem from './ResultItem';
import './ResultsList.scss';

/**
 * Component that renders search results list.
 *
 * @param {object} params - The react component parameters.
 * @param {object[]} params.values - The list of search result items.
 * @param {string} params.selectedIndex - The index of selected item.
 * @param {string} params.emptyMessage - The message to be displayed when there are no values.
 */
const ResultsList = ({
  values,
  selectedIndex,
  emptyMessage,
  className,
  onItemClick,
}) => (
  <div className={classnames(['results-list', className])}>
    {values.length === 0 ? (
      <span className="results-list__empty">{emptyMessage}</span>
    ) : (
      <ul className="results-list__list" role="listbox" onClick={onItemClick}>
        {values.map((value, index) => (
          <ResultItem
            key={value.placeKey}
            value={value}
            isSelected={index === selectedIndex}
            index={index}
          />
        ))}
      </ul>
    )}
  </div>
);

ResultsList.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
  selectedIndex: PropTypes.number,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
  onItemClick: PropTypes.func.isRequired,
};

export default ResultsList;
