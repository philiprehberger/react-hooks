import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('react-hooks', async () => {
  const mod = await import('../../dist/index.js');

  it('exports useBodyScrollLock as a function', () => {
    assert.ok(typeof mod.useBodyScrollLock === 'function');
  });

  it('exports useFocusTrap as a function', () => {
    assert.ok(typeof mod.useFocusTrap === 'function');
  });

  it('exports useDebounce as a function', () => {
    assert.ok(typeof mod.useDebounce === 'function');
  });
});
