import React from 'react';
import PropTypes from 'prop-types';
import '../../../types/typedefs';
import './ResultsItem.scss';

/**
 * Component that renders search result item.
 *
 * @param {object} params - The react component parameters.
 * @param {SearchResult} params.value - The object that represents single result item.
 * @param {boolean} params.isSelected - The flag that indicates if the items is selected (true) or not (false).
 * @param {number} params.index - The item index in the list.
 */
const ResultItem = ({ value, isSelected, index }) => (
  <li
    data-idx={index}
    className="results-list-item"
    role="option"
    aria-selected={isSelected}
  >
    <div className="results-list-item__container">
      <span>{value.placeKey}</span>
    </div>
    <hr className="results-list-item__divider" />
  </li>
);

ResultItem.propTypes = {
  value: PropTypes.shape({
    placeKey: PropTypes.string.isRequired,
    placeType: PropTypes.string.isRequired,
  }),
  isSelected: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

ResultItem.defaultProps = {
  isSelected: false,
};

export default ResultItem;
