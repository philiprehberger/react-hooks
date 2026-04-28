# @philiprehberger/react-hooks

[![CI](https://github.com/philiprehberger/ts-react-hooks/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-react-hooks/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/react-hooks.svg)](https://www.npmjs.com/package/@philiprehberger/react-hooks)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/ts-react-hooks)](https://github.com/philiprehberger/ts-react-hooks/commits/main)

Reusable React hooks - scroll lock, focus trap, swipe gestures, debounce, keyboard shortcuts, image preloading, and more

## Installation

```bash
npm install @philiprehberger/react-hooks
```

## Usage

```ts
import { useBodyScrollLock, useFocusTrap } from '@philiprehberger/react-hooks';

function Modal({ isOpen }: { isOpen: boolean }) {
  useBodyScrollLock(isOpen);
  const ref = useFocusTrap<HTMLDivElement>(isOpen);
  return isOpen ? <div ref={ref}>Modal content</div> : null;
}
```

### useBodyScrollLock

```ts
import { useBodyScrollLock } from '@philiprehberger/react-hooks';

function Modal({ isOpen }: { isOpen: boolean }) {
  useBodyScrollLock(isOpen);
  return isOpen ? <div className="modal">...</div> : null;
}
```

### useFocusTrap

```ts
import { useFocusTrap } from '@philiprehberger/react-hooks';

function Dialog({ isOpen }: { isOpen: boolean }) {
  const ref = useFocusTrap<HTMLDivElement>(isOpen);
  return <div ref={ref}>...</div>;
}
```

### useSwipeGesture

```ts
import { useSwipeGesture } from '@philiprehberger/react-hooks';

function Drawer({ onClose }: { onClose: () => void }) {
  const ref = useSwipeGesture<HTMLDivElement>({
    onSwipeLeft: onClose,
    threshold: 80,
  });
  return <div ref={ref}>...</div>;
}
```

### useDebounce

```ts
import { useDebounce } from '@philiprehberger/react-hooks';

function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) fetchResults(debouncedQuery);
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

### usePrefersReducedMotion

```ts
import { usePrefersReducedMotion } from '@philiprehberger/react-hooks';

function Animated() {
  const reduced = usePrefersReducedMotion();
  return <div className={reduced ? 'static' : 'animated'} />;
}
```

### useKeyboardShortcuts

```ts
import { useKeyboardShortcuts } from '@philiprehberger/react-hooks';

function App() {
  useKeyboardShortcuts([
    { keys: ['ctrl', 's'], handler: () => save(), description: 'Save' },
  ]);
  return <main>...</main>;
}
```

### useKeyboardNavigation

```ts
import { useKeyboardNavigation } from '@philiprehberger/react-hooks';

function Menu({ items }: { items: string[] }) {
  const { activeIndex, setActiveIndex } = useKeyboardNavigation({
    itemCount: items.length,
    orientation: 'vertical',
  });
  return (
    <ul>
      {items.map((item, i) => (
        <li key={item} aria-selected={i === activeIndex}>{item}</li>
      ))}
    </ul>
  );
}
```

### useImagePreload

```ts
import { useImagePreload } from '@philiprehberger/react-hooks';

function Gallery({ urls }: { urls: string[] }) {
  const { loaded, total, isLoading } = useImagePreload({ sources: urls });
  return <div>{isLoading ? `${loaded}/${total}` : 'Ready'}</div>;
}
```

### useClickOutside

```ts
import { useRef, useState } from 'react';
import { useClickOutside } from '@philiprehberger/react-hooks';

function Dropdown() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useClickOutside(ref, () => setOpen(false));

  return <div ref={ref}>{open && <ul>...</ul>}</div>;
}
```

### useWindowSize

```ts
import { useWindowSize } from '@philiprehberger/react-hooks';

function Layout() {
  const { width, height } = useWindowSize({ debounceMs: 150 });
  return <div>{width} x {height}</div>;
}
```

### useIntersectionObserver

```ts
import { useRef } from 'react';
import { useIntersectionObserver } from '@philiprehberger/react-hooks';

function LazySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useIntersectionObserver(ref, { threshold: 0.25 });

  return <div ref={ref}>{isIntersecting ? 'Visible' : 'Hidden'}</div>;
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
| `useClickOutside` | `<T extends HTMLElement>(ref, handler) => void` | Fire a handler on mousedown/touchstart outside the referenced element |
| `useWindowSize` | `(opts?: { debounceMs?: number }) => { width, height }` | Track window dimensions with optional debounce, SSR-safe |
| `useIntersectionObserver` | `<T extends Element>(ref, opts?) => { isIntersecting, entry }` | Observe element intersection with the viewport |

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

⭐ [Star the repo](https://github.com/philiprehberger/ts-react-hooks)

🐛 [Report issues](https://github.com/philiprehberger/ts-react-hooks/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/ts-react-hooks/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
