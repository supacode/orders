import { describe, it, expect } from 'vitest';
import { decodeParam } from '../decodeParam';

describe('decodeParam', () => {
  it('decodes basic URI-encoded strings', () => {
    expect(decodeParam('abc%20xyz')).toBe('abc xyz');
    expect(decodeParam('dy%3Ddx')).toBe('dy=dx');
  });

  it('replaces + with space before decoding', () => {
    expect(decodeParam('abc+xyz')).toBe('abc xyz');
    expect(decodeParam('abc+xyz%21')).toBe('abc xyz!');
  });

  it('returns original value if decoding fails', () => {
    expect(decodeParam('%E0%A4%A')).toBe('%E0%A4%A');
  });

  it('handles already decoded or plain strings', () => {
    expect(decodeParam('plain text')).toBe('plain text');
    expect(decodeParam('123+456')).toBe('123 456');
  });
});
