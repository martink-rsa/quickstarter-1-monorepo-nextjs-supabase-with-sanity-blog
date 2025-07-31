import { describe, it, expect, vi } from 'vitest';
import { capitalize } from '@/lib/utils';

describe('utils', () => {
  describe('capitalize', () => {
    it('capitalizes first letter and lowercases rest', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('hELLo WoRLd')).toBe('Hello world');
    });
  });
});
