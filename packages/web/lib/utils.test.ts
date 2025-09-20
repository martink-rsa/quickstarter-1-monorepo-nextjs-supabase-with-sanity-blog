import { capitalize } from '@/lib/utils';
import { describe, expect, it } from 'vitest';

describe('utils', () => {
  describe('capitalize', () => {
    it('capitalizes first letter and lowercases rest', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('hELLo WoRLd')).toBe('Hello world');
    });
  });
});
