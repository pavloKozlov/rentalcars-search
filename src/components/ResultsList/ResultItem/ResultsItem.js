import React from 'react';
import PropTypes from 'prop-types';
import '../../../types/typedefs';
import { getNameByPlaceType } from '../../../utils/placeUtils';
import './ResultsItem.scss';

/**
 * Component that renders search result item.
 *
 * @param {object} params - The react component parameters.
 * @param {SearchResult} params.value - The object that represents single result item.
 * @param {boolean} params.isSelected - The flag that indicates if the items is selected (true) or not (false).
 * @param {number} params.index - The item index in the list.
 */
const ResultItem = ({ value, isSelected, index }) => {
  const line1 = value.iata ? `${value.name} (${value.iata})` : value.name;
  const line2 = [value.city, value.region, value.country]
    .filter((val) => !!val)
    .join(', ');
  const locationBadge = `results-list-item__location-badge results-list-item__location-badge--type-${value.placeType}`;

  return (
    <li
      data-idx={index}
      className="results-list-item"
      role="option"
      aria-selected={isSelected}
    >
      <div className="results-list-item__container">
        <span className={locationBadge}>
          {getNameByPlaceType(value.placeType)}
        </span>
        <div>
          <div className="results-list-item__line1">{line1}</div>
          <div className="results-list-item__line2">{line2}</div>
        </div>
      </div>
      <hr className="results-list-item__divider" />
    </li>
  );
};

ResultItem.propTypes = {
  value: PropTypes.shape({
    iata: PropTypes.string,
    name: PropTypes.string.isRequired,
    region: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string.isRequired,
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
