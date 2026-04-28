import { useEffect, useState, type RefObject } from 'react';

export interface UseIntersectionObserverReturn {
  isIntersecting: boolean;
  entry: IntersectionObserverEntry | null;
}

/**
 * Observe whether an element intersects the viewport (or a custom root).
 * Returns intersection state and the latest observer entry. Cleans up on unmount.
 * @param ref - Ref attached to the element being observed
 * @param opts - IntersectionObserver options (root, rootMargin, threshold)
 */
export function useIntersectionObserver<T extends Element>(
  ref: RefObject<T | null>,
  opts: IntersectionObserverInit = {}
): UseIntersectionObserverReturn {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const { root = null, rootMargin, threshold } = opts;

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry);
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref, root, rootMargin, threshold]);

  return {
    isIntersecting: entry?.isIntersecting ?? false,
    entry,
  };
}
