import React from 'react';
import PropTypes from 'prop-types';
import '../../../types/typedefs';
import '../resultsList.scss';

/**
 * Component that renders search result item.
 *
 * @param {object} params - The react component parameters.
 * @param {SearchResult} params.value - The object that represents single result item.
 */
const ResultItem = ({ value }) => (
  <li className="results-list-item">
    <span>{value.locationId}</span>
  </li>
);

ResultItem.propTypes = {
  value: PropTypes.shape({
    locationId: PropTypes.string.isRequired,
    placeType: PropTypes.string.isRequired,
  }),
};

export default ResultItem;
