import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('parses multiple pairs', () => {
  assert.deepEqual(api.parseCookieHeader('a=1; b=two'), [
    { name: 'a', value: '1' },
    { name: 'b', value: 'two' },
  ]);
});
test('preserves duplicate names', () => {
  assert.equal(api.parseCookieHeader('a=1; a=2').length, 2);
});
test('keeps equals in values', () => {
  assert.equal(api.parseCookieHeader('token=a=b')[0]?.value, 'a=b');
});
test('formats pairs', () => {
  assert.equal(
    api.formatCookieHeader([
      { name: 'a', value: '1' },
      { name: 'b', value: '2' },
    ]),
    'a=1; b=2',
  );
});
test('accepts empty header', () => {
  assert.deepEqual(api.parseCookieHeader('  '), []);
});
test('rejects malformed pair', () => {
  assert.throws(() => api.parseCookieHeader('broken'), RangeError);
});
