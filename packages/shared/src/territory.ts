import type { Business } from './business.js';
import type { PlayerId } from './player.js';
import type { ResourcePool } from './resources.js';

export type TerritoryId = string;

export const NORMAL_TERRITORY_TYPES = [
  'commercial',
  'residential',
  'mixed',
  'industrial',
  'marginal',
  'public-space',
  'financial',
  'entertainment',
] as const;

export const SPECIAL_TERRITORY_TYPES = ['police-station', 'hospital', 'transport'] as const;

export const INSTITUTIONAL_TERRITORY_TYPES = [
  'government-house',
  'judicial-district',
  'city-hall',
  'legislature',
  'education-district',
] as const;

export type NormalTerritoryType = (typeof NORMAL_TERRITORY_TYPES)[number];
export type SpecialTerritoryType = (typeof SPECIAL_TERRITORY_TYPES)[number];
export type InstitutionalTerritoryType = (typeof INSTITUTIONAL_TERRITORY_TYPES)[number];

export type AcquirableTerritoryType = NormalTerritoryType | SpecialTerritoryType;
export type TerritoryType = AcquirableTerritoryType | InstitutionalTerritoryType;

// null means the territory belongs to the Government (neutral).
export type TerritoryOwner = PlayerId | null;

type TerritoryBase = {
  id: TerritoryId;
  name: string;
  adjacentTerritoryIds: TerritoryId[];
};

// Attributes rolled at game start. They never change, so ceding a territory
// back to the Government restores exactly these values.
export type TerritoryStats = {
  production: ResourcePool;
  resistance: number;
  economicValue: number;
  baseAcquisitionCost: number;
};

export type AcquirableTerritory = TerritoryBase & {
  kind: 'acquirable';
  type: AcquirableTerritoryType;
  stats: TerritoryStats;

  ownerId: TerritoryOwner;

  // Resistance × 0.75 once acquired, 0 while neutral.
  baseDefense: number;
  // baseDefense minus accumulated damage from sabotage and police raids.
  currentDefense: number;
  // Defense invested during Planning, locked for the current round.
  committedDefense: number;
  // Last round in which an infiltrated territory suffers -25% base defense.
  weakenedUntilRound: number | null;

  businesses: Business[];
};

// Institutional territories can never be owned; they only modify their neighbors.
export type InstitutionalTerritory = TerritoryBase & {
  kind: 'institutional';
  type: InstitutionalTerritoryType;
};

export type Territory = AcquirableTerritory | InstitutionalTerritory;
