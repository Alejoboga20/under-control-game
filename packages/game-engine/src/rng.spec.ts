import { describe, expect, it } from 'vitest';
import { createRng } from './rng.js';

function draws(seed: number, count: number): number[] {
  const rng = createRng(seed);
  return Array.from({ length: count }, () => rng.random());
}

describe('createRng', () => {
  it('produces the same sequence for the same seed', () => {
    expect(draws(42, 100)).toEqual(draws(42, 100));
  });

  it('produces different sequences for different seeds', () => {
    expect(draws(1, 10)).not.toEqual(draws(2, 10));
  });

  it('resumes the exact sequence from a saved state', () => {
    const rng = createRng(7);
    rng.random();
    rng.random();
    const resumed = createRng(rng.getState());

    expect(Array.from({ length: 20 }, () => resumed.random())).toEqual(
      Array.from({ length: 20 }, () => rng.random()),
    );
  });

  it('returns floats in [0, 1)', () => {
    for (const value of draws(123, 10_000)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  describe('randomInt', () => {
    it('stays within the inclusive range and hits both ends', () => {
      const rng = createRng(99);
      const seen = new Set<number>();
      for (let i = 0; i < 1_000; i++) {
        const value = rng.randomInt(2, 5);
        expect(value).toBeGreaterThanOrEqual(2);
        expect(value).toBeLessThanOrEqual(5);
        seen.add(value);
      }
      expect([...seen].sort()).toEqual([2, 3, 4, 5]);
    });

    it('returns min when min equals max', () => {
      expect(createRng(1).randomInt(3, 3)).toBe(3);
    });

    it('rejects invalid ranges', () => {
      const rng = createRng(1);
      expect(() => rng.randomInt(5, 2)).toThrow(RangeError);
      expect(() => rng.randomInt(0, 1.5)).toThrow(RangeError);
    });
  });

  describe('pick', () => {
    it('returns an element of the array', () => {
      const items = ['a', 'b', 'c'];
      expect(items).toContain(createRng(5).pick(items));
    });

    it('rejects an empty array', () => {
      expect(() => createRng(5).pick([])).toThrow(RangeError);
    });
  });

  describe('shuffle', () => {
    it('keeps the same elements without mutating the input', () => {
      const items = [1, 2, 3, 4, 5, 6];
      const shuffled = createRng(11).shuffle(items);

      expect([...shuffled].sort()).toEqual(items);
      expect(items).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('is deterministic for the same seed', () => {
      const items = [1, 2, 3, 4, 5, 6, 7, 8];
      expect(createRng(3).shuffle(items)).toEqual(createRng(3).shuffle(items));
    });
  });
});
