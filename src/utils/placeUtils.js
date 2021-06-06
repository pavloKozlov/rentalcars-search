/**
 * Converts place type to place name
 *
 * @param {String} placeType - The place type constant/enum.
 * @returns {String} place name that corresponds to the placeType input.
 */
const getNameByPlaceType = (placeType) => {
  let result = '';
  switch (placeType) {
    case 'A':
      result = 'Airport';
      break;
    case 'C':
      result = 'City';
      break;
    case 'D':
      result = 'District';
      break;
    default:
  }
  return result;
};

export { getNameByPlaceType };
