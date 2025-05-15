import { describe, it, expect } from 'vitest';
import { decodeParam } from '../decodeParam';

describe('decodeParam', () => {
  it('decodes basic URI-encoded strings', () => {
    expect(decodeParam('hello%20world')).toBe('hello world');
    expect(decodeParam('foo%3Dbar')).toBe('foo=bar');
  });

  it('replaces + with space before decoding', () => {
    expect(decodeParam('hello+world')).toBe('hello world');
    expect(decodeParam('foo+bar%21')).toBe('foo bar!');
  });

  it('returns original value if decoding fails', () => {
    expect(decodeParam('%E0%A4%A')).toBe('%E0%A4%A');
  });

  it('handles already decoded or plain strings', () => {
    expect(decodeParam('plain text')).toBe('plain text');
    expect(decodeParam('123+456')).toBe('123 456');
  });
});
