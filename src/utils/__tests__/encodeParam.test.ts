import { describe, it, expect } from 'vitest';
import { encodeParam } from '../encodeParam';

describe('encodeParam', () => {
  it('encodes spaces and special characters correctly', () => {
    expect(encodeParam('hello world')).toBe('hello%20world');
    expect(encodeParam('foo=bar&baz')).toBe('foo%3Dbar%26baz');
    expect(encodeParam('a+b')).toBe('a%2Bb');
  });

  it('leaves safe characters unchanged', () => {
    expect(encodeParam('abc123')).toBe('abc123');
    expect(encodeParam('-_.~')).toBe('-_.~');
  });

  it('returns original value on error (invalid input)', () => {
    expect(encodeParam({} as unknown as string)).toBe('%5Bobject%20Object%5D');
  });

  it('works with unicode characters', () => {
    expect(encodeParam('こんにちは')).toBe(
      '%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF',
    );
  });
});
