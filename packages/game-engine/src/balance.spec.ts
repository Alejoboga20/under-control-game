import {
  CHARACTER_IDS,
  NORMAL_TERRITORY_TYPES,
  RESOURCE_KEYS,
  SPECIAL_TERRITORY_TYPES,
} from '@under-control/shared';
import { describe, expect, it } from 'vitest';
import { BALANCE, type Range } from './balance.js';

const ACQUIRABLE_TYPES = [...NORMAL_TERRITORY_TYPES, ...SPECIAL_TERRITORY_TYPES];

function expectValidRange({ min, max }: Range) {
  expect(Number.isInteger(min)).toBe(true);
  expect(Number.isInteger(max)).toBe(true);
  expect(min).toBeGreaterThanOrEqual(0);
  expect(max).toBeGreaterThanOrEqual(min);
}

function isIncreasing(values: readonly number[]) {
  return values.every((value, i) => i === 0 || value > values[i - 1]!);
}

describe('BALANCE', () => {
  it('has valid production and resistance ranges for every acquirable type', () => {
    for (const type of ACQUIRABLE_TYPES) {
      for (const resource of RESOURCE_KEYS) {
        expectValidRange(BALANCE.territoryProduction[type][resource]);
      }
      expectValidRange(BALANCE.territoryResistance[type]);
    }
  });

  it('makes every acquirable type produce something', () => {
    for (const type of ACQUIRABLE_TYPES) {
      const maxTotal = RESOURCE_KEYS.reduce(
        (total, resource) => total + BALANCE.territoryProduction[type][resource].max,
        0,
      );
      expect(maxTotal, type).toBeGreaterThan(0);
    }
  });

  it('lets a starting player afford one expansion of the weakest zones', () => {
    const { influence, gangMembers } = BALANCE.startingResources;
    const { powerWeights } = BALANCE.expansion;
    const startingPower =
      influence * powerWeights.influence + gangMembers * powerWeights.gangMembers;

    expect(startingPower).toBeGreaterThanOrEqual(BALANCE.territoryResistance.marginal.max);
  });

  it('gives every character at least one starting territory type', () => {
    for (const id of CHARACTER_IDS) {
      expect(BALANCE.characters[id].startingTerritoryTypes.length, id).toBeGreaterThan(0);
    }
  });

  it('only allows businesses in normal territories', () => {
    for (const config of Object.values(BALANCE.businesses)) {
      for (const type of config.allowedTerritoryTypes) {
        expect(NORMAL_TERRITORY_TYPES).toContain(type);
      }
    }
  });

  it('has one upgrade cost per level above 1 and one production multiplier per level', () => {
    const { maxLevel, upgradeCostMultipliers, levelProductionMultipliers } = BALANCE.business;
    expect(upgradeCostMultipliers).toHaveLength(maxLevel - 1);
    expect(levelProductionMultipliers).toHaveLength(maxLevel);
    expect(isIncreasing(levelProductionMultipliers)).toBe(true);
  });

  it('makes each acquisition in a round more expensive than the previous one', () => {
    const { costMultipliers, extraCostMultiplierStep } = BALANCE.expansion;
    expect(costMultipliers[0]).toBe(1);
    expect(isIncreasing(costMultipliers)).toBe(true);
    expect(extraCostMultiplierStep).toBeGreaterThan(0);
  });

  it('covers the whole Police Attention scale with increasing raid chances', () => {
    const { raidChances, maxAttention } = BALANCE.police;
    expect(isIncreasing(raidChances.map((band) => band.maxAttention))).toBe(true);
    expect(isIncreasing(raidChances.map((band) => band.chance))).toBe(true);
    expect(raidChances.at(-1)?.maxAttention).toBe(maxAttention);
    for (const { chance } of raidChances) {
      expect(chance).toBeGreaterThanOrEqual(0);
      expect(chance).toBeLessThanOrEqual(1);
    }
  });
});
