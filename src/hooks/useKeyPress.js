import { useEffect } from 'react';

const useKeyPress = (fn, deps) => {
  useEffect(() => {
    window.addEventListener('keydown', fn);

    return () => {
      window.removeEventListener('keydown', fn);
    };
  }, deps);
};

export default useKeyPress;
