import { describe, it, expect } from 'vitest';
import { compareValues } from '../compareValues';

describe('compareValues', () => {
  it('compares numbers correctly', () => {
    expect(compareValues(2, 3)).toBeLessThan(0);
    expect(compareValues(3, 2)).toBeGreaterThan(0);
    expect(compareValues(5, 5)).toBe(0);
  });

  it('compares strings correctly', () => {
    expect(compareValues('apple', 'banana')).toBeLessThan(0);
    expect(compareValues('banana', 'apple')).toBeGreaterThan(0);
    expect(compareValues('cherry', 'cherry')).toBe(0);
  });

  it('returns 0 when types differ', () => {
    expect(compareValues(1, '1')).toBe(0);
    expect(compareValues('1', 1)).toBe(0);
    expect(compareValues(true, false)).toBe(0);
  });

  it('returns 0 for unsupported types', () => {
    expect(compareValues({}, {})).toBe(0);
    expect(compareValues([], [])).toBe(0);
    expect(compareValues(null, null)).toBe(0);
    expect(compareValues(undefined, undefined)).toBe(0);
  });
});
