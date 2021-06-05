import React from 'react';
import PropTypes from 'prop-types';
import ResultItem from './ResultItem/ResultsItem';
import './resultsList.scss';

/**
 * Component that renders search results list.
 *
 * @param {object} params - The react component parameters.
 * @param {object[]} params.values - The list of search result items.
 * @param {string} params.emptyMessage - The message to be displayed when there are no values.
 */
const ResultsList = ({ values, emptyMessage }) => (
  <div className="results-list">
    {values.length === 0 ? (
      <span className="results-list__empty">{emptyMessage}</span>
    ) : (
      <ul className="results-list__list">
        {values.map((value) => (
          <ResultItem key={value.locationId} value={value} />
        ))}
      </ul>
    )}
  </div>
);

ResultsList.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
  emptyMessage: PropTypes.string,
};

export default ResultsList;
