# @philiprehberger/react-hooks

[![CI](https://github.com/philiprehberger/react-hooks/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/react-hooks/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/react-hooks.svg)](https://www.npmjs.com/package/@philiprehberger/react-hooks)
[![License](https://img.shields.io/github/license/philiprehberger/react-hooks)](LICENSE)

Reusable React hooks for common UI patterns.

## Installation

```bash
npm install @philiprehberger/react-hooks
```

## Hooks

### `useBodyScrollLock(isLocked: boolean)`

Lock body scroll when a condition is true. Preserves and restores scroll position.

```tsx
import { useBodyScrollLock } from '@philiprehberger/react-hooks';

function Modal({ isOpen }: { isOpen: boolean }) {
  useBodyScrollLock(isOpen);
  return isOpen ? <div className="modal">...</div> : null;
}
```

### `useFocusTrap<T extends HTMLElement>(isActive: boolean)`

Trap keyboard focus within a container. Returns a ref to attach to the container element.

```tsx
import { useFocusTrap } from '@philiprehberger/react-hooks';

function Dialog({ isOpen }: { isOpen: boolean }) {
  const ref = useFocusTrap<HTMLDivElement>(isOpen);
  return <div ref={ref}>...</div>;
}
```

### `useSwipeGesture<T extends HTMLElement>(options: SwipeOptions)`

Detect touch swipe gestures. Returns a ref to attach to the target element.

```tsx
import { useSwipeGesture } from '@philiprehberger/react-hooks';

function Drawer({ onClose }: { onClose: () => void }) {
  const ref = useSwipeGesture<HTMLDivElement>({
    onSwipeLeft: onClose,
    threshold: 80,
  });
  return <div ref={ref}>...</div>;
}
```

## License

MIT
