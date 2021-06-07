import { useEffect } from 'react';

/**
 * Custom react hook to add and clean up `keydown` event listener.
 *
 * @param {Function} fn - The callback function that will be called.
 * @param {array} deps - The list of dependencies. When dependencies changes, event listener will be removed and added again.
 */
const useKeyPress = (fn, deps) => {
  useEffect(() => {
    window.addEventListener('keydown', fn);

    return () => {
      window.removeEventListener('keydown', fn);
    };
  }, deps);
};

export default useKeyPress;
