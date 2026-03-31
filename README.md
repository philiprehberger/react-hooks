# @philiprehberger/react-hooks

[![CI](https://github.com/philiprehberger/react-hooks/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/react-hooks/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/react-hooks.svg)](https://www.npmjs.com/package/@philiprehberger/react-hooks)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/react-hooks)](https://github.com/philiprehberger/react-hooks/commits/main)

Reusable React hooks for common UI patterns

## Installation

```bash
npm install @philiprehberger/react-hooks
```

## Hooks

### `useBodyScrollLock(isLocked: boolean)`

Lock body scroll when a condition is true. Preserves and restores scroll position

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

## Usage

```tsx
import {
  useBodyScrollLock,
  useFocusTrap,
  useDebounce,
  useKeyboardShortcuts,
} from '@philiprehberger/react-hooks';

function Modal({ isOpen }: { isOpen: boolean }) {
  useBodyScrollLock(isOpen);
  const ref = useFocusTrap<HTMLDivElement>(isOpen);

  return isOpen ? <div ref={ref}>Modal content</div> : null;
}

function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

## API

### Hooks

| Hook | Signature | Description |
|------|-----------|-------------|
| `useBodyScrollLock` | `(isLocked: boolean) => void` | Lock body scroll when a condition is true |
| `useFocusTrap` | `<T extends HTMLElement>(isActive: boolean) => RefObject<T>` | Trap keyboard focus within a container |
| `useSwipeGesture` | `<T extends HTMLElement>(options: SwipeOptions) => RefObject<T>` | Detect touch swipe gestures |
| `useDebounce` | `<T>(value: T, delay?: number) => T` | Debounce a value (default: 500ms) |
| `useDebouncedCallback` | `<T>(callback: T, delay?: number) => T` | Debounce a callback function |
| `usePrefersReducedMotion` | `() => boolean` | Detect user's reduced motion preference |
| `useKeyboardShortcuts` | `(shortcuts: KeyboardShortcut[], options?) => KeyboardShortcut[]` | Register keyboard shortcuts with modifier key support |
| `useKeyboardNavigation` | `(options: UseKeyboardNavigationOptions) => UseKeyboardNavigationReturn` | Keyboard navigation for lists and menus (roving tabindex) |
| `useImagePreload` | `(options: UseImagePreloadOptions) => UseImagePreloadReturn` | Preload images with progress tracking |

### Utilities

| Function | Signature | Description |
|----------|-----------|-------------|
| `formatShortcut` | `(shortcut: KeyboardShortcut) => string` | Format a shortcut for display (e.g., "Ctrl+S") |
| `getShortcutKeys` | `(shortcut: KeyboardShortcut) => string[]` | Get individual key parts for rendering badges |
| `groupShortcutsByCategory` | `(shortcuts: KeyboardShortcut[]) => Map<string, KeyboardShortcut[]>` | Group shortcuts by category |
| `preloadImage` | `(src: string) => Promise<HTMLImageElement>` | Preload a single image imperatively |
| `preloadImages` | `(sources: string[], onProgress?) => Promise<HTMLImageElement[]>` | Preload multiple images with progress callback |

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/react-hooks)

🐛 [Report issues](https://github.com/philiprehberger/react-hooks/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/react-hooks/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
