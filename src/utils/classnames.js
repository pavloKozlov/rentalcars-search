/**
 * Get className string based on the list of css classes.
 *
 * @param {Array} values - The list of css classes.
 * @returns {String} className string with space-separated css classes.
 */
const classnames = (values) => values.filter((val) => !!val).join(' ');

export default classnames;
