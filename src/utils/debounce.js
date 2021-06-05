/**
 * Creates a debounced function that delays invoking callback until there are no new invocation during last `delay` miliseconds.
 *
 * @param {Function} fn - The callback function that will be called.
 * @param {number} delay - The delay in miliseconds.
 */
const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      // eslint-disable-next-line prefer-spread
      fn.apply(null, args);
    }, delay);
  };
};

export default debounce;
