import React from 'react';
import PropTypes from 'prop-types';
import classnames from '../../utils/classnames';
import ResultItem from './ResultItem';
import './ResultsList.scss';

/**
 * Component that renders search results list.
 */
const ResultsList = ({
  values,
  selectedIndex,
  emptyMessage,
  className,
  optionIdPrefix,
  onItemClick,
  onItemHover,
}) => (
  <div className={classnames(['results-list', className])}>
    {values.length === 0 ? (
      <span className="results-list__empty">{emptyMessage}</span>
    ) : (
      <ul className="results-list__list" role="listbox" onClick={onItemClick}>
        {values.map((value, index) => (
          <ResultItem
            key={value.placeKey}
            id={`${optionIdPrefix}${index}`}
            value={value}
            isSelected={index === selectedIndex}
            index={index}
            onHover={onItemHover}
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
  optionIdPrefix: PropTypes.string,
  onItemClick: PropTypes.func.isRequired,
  onItemHover: PropTypes.func.isRequired,
};

export default ResultsList;
