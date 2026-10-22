// Seeded pseudo-random number generator (mulberry32).
// The engine must never use Math.random(): every random draw goes through an Rng
// built from GameState.rngState, and the final state is written back to the game.

export type Rng = {
  // Float in [0, 1).
  random(): number;
  // Integer in [min, max], both inclusive.
  randomInt(min: number, max: number): number;
  // Random element of a non-empty array.
  pick<T>(items: readonly T[]): T;
  // New array with the same elements in random order.
  shuffle<T>(items: readonly T[]): T[];
  // Current internal state, to be stored as GameState.rngState.
  getState(): number;
};

export function createRng(state: number): Rng {
  let current = state >>> 0;

  function random(): number {
    current = (current + 0x6d2b79f5) >>> 0;
    let t = current;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  function randomInt(min: number, max: number): number {
    if (!Number.isInteger(min) || !Number.isInteger(max) || min > max) {
      throw new RangeError(`Invalid integer range [${min}, ${max}]`);
    }
    return min + Math.floor(random() * (max - min + 1));
  }

  function pick<T>(items: readonly T[]): T {
    if (items.length === 0) {
      throw new RangeError('Cannot pick from an empty array');
    }
    return items[randomInt(0, items.length - 1)]!;
  }

  function shuffle<T>(items: readonly T[]): T[] {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = randomInt(0, i);
      [result[i], result[j]] = [result[j]!, result[i]!];
    }
    return result;
  }

  return {
    random,
    randomInt,
    pick,
    shuffle,
    getState: () => current,
  };
}
