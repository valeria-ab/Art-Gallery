import { useCallback, useRef } from 'react';

function useDebounce(callback: () => void, delay: number) {
  const timer = useRef<number>();

  return useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = +setTimeout(() => {
      callback();
    }, delay);
  }, [callback, delay]);
}

export default useDebounce;
