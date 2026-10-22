import type { TerritoryId } from './territory.js';

export type PoliceState = {
  // The visible patrol car. Moves to a random adjacent territory at the end of each round.
  patrolCarTerritoryId: TerritoryId;
};

export type PoliceRaidOutcome = 'territory-lost' | 'defense-reduced';
