import { useRef } from 'react';
import debounce from '../utils/debounce';

/**
 * Custom react hook to deboiunce function.
 *
 * @param {Function} fn - The callback function that will be called.
 * @param {number} delay - The delay in miliseconds.
 */
const useDebounce = (fn, delay) => {
  const ref = useRef(null);
  if (!ref.current) {
    // debounce function only once
    ref.current = debounce(fn, delay);
  }
  return ref.current;
};

export default useDebounce;
