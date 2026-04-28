import { useEffect, type RefObject } from 'react';

/**
 * Fire a handler when a mousedown or touchstart occurs outside the referenced element.
 * Useful for closing dropdowns, popovers, and modals on outside clicks.
 * @param ref - Ref attached to the element treated as "inside"
 * @param handler - Callback invoked on outside click/touch
 */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent | TouchEvent) => void
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (!element || element.contains(event.target as Node)) return;
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener, { passive: true });

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
