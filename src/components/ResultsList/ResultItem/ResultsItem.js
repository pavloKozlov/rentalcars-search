import React from 'react';
import PropTypes from 'prop-types';
import '../../../types/typedefs';
import { getNameByPlaceType } from '../../../utils/placeUtils';
import './ResultsItem.scss';

/**
 * Component that renders search result item.
 */
const ResultItem = ({ id, value, isSelected, index, onHover }) => {
  const line1 = value.iata ? `${value.name} (${value.iata})` : value.name;
  const line2 = [value.city, value.region, value.country]
    .filter((val) => !!val)
    .join(', ');
  const locationBadge = `results-list-item__location-badge results-list-item__location-badge--type-${value.placeType}`;

  return (
    <li
      id={id}
      data-idx={index}
      className="results-list-item"
      role="option"
      aria-selected={isSelected}
      onMouseEnter={onHover}
    >
      <div className="results-list-item__container" role="button" tabIndex="0">
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
  id: PropTypes.string,
  value: PropTypes.shape({
    iata: PropTypes.string,
    name: PropTypes.string,
    region: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    placeKey: PropTypes.string,
    placeType: PropTypes.string,
  }),
  isSelected: PropTypes.bool,
  index: PropTypes.number.isRequired,
  onHover: PropTypes.func,
};

ResultItem.defaultProps = {
  isSelected: false,
};

export default ResultItem;
