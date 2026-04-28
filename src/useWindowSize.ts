import { useEffect, useState } from 'react';

export interface UseWindowSizeOptions {
  /** Debounce resize updates by this many milliseconds (default: 0, no debounce) */
  debounceMs?: number;
}

export interface WindowSize {
  width: number;
  height: number;
}

function getInitialSize(): WindowSize {
  if (typeof window === 'undefined') return { width: 0, height: 0 };
  return { width: window.innerWidth, height: window.innerHeight };
}

/**
 * Track window dimensions, updating on resize. SSR-safe — returns 0/0 on the server.
 * @param opts.debounceMs - Optional debounce in ms applied to resize updates
 */
export function useWindowSize(opts: UseWindowSizeOptions = {}): WindowSize {
  const { debounceMs = 0 } = opts;
  const [size, setSize] = useState<WindowSize>(getInitialSize);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const update = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    const handleResize = () => {
      if (debounceMs <= 0) {
        update();
        return;
      }
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(update, debounceMs);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [debounceMs]);

  return size;
}
