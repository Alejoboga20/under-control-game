import type { CedeTerritoryReward, SabotageMode } from './actions.js';
import type { BusinessId, BusinessType } from './business.js';
import type { CharacterId } from './character.js';
import type { PlayerId } from './player.js';
import type { PoliceRaidOutcome } from './police.js';
import type { ResourcePool } from './resources.js';
import type { TerritoryId } from './territory.js';

// Events describe what happened during a round. They feed the per-player round summary.

type EventBase = {
  round: number;
};

export type SetupDiceRolledEvent = EventBase & {
  type: 'setup-dice-rolled';
  rolls: Record<PlayerId, number>;
  pickOrder: PlayerId[];
};

export type CharacterSelectedEvent = EventBase & {
  type: 'character-selected';
  playerId: PlayerId;
  characterId: CharacterId;
  startingTerritoryId: TerritoryId;
};

export type ResourcesProducedEvent = EventBase & {
  type: 'resources-produced';
  playerId: PlayerId;
  produced: ResourcePool;
};

export type TerritoryAcquiredEvent = EventBase & {
  type: 'territory-acquired';
  playerId: PlayerId;
  territoryId: TerritoryId;
  method: 'expansion' | 'infiltration';
};

export type TerritoryAttackedEvent = EventBase & {
  type: 'territory-attacked';
  attackerId: PlayerId;
  defenderId: PlayerId;
  territoryId: TerritoryId;
  attackPower: number;
  effectiveDefense: number;
  conquered: boolean;
};

export type TerritorySabotagedEvent = EventBase & {
  type: 'territory-sabotaged';
  saboteurId: PlayerId;
  targetPlayerId: PlayerId;
  territoryId: TerritoryId;
  mode: SabotageMode;
  // Defense removed ('weaken') or police attention added to the target ('stir-up').
  amount: number;
};

export type BusinessBuiltEvent = EventBase & {
  type: 'business-built';
  playerId: PlayerId;
  territoryId: TerritoryId;
  businessId: BusinessId;
  businessType: BusinessType;
};

export type BusinessUpgradedEvent = EventBase & {
  type: 'business-upgraded';
  playerId: PlayerId;
  territoryId: TerritoryId;
  businessId: BusinessId;
  level: number;
};

export type TerritoryCededEvent = EventBase & {
  type: 'territory-ceded';
  playerId: PlayerId;
  territoryId: TerritoryId;
  reward: CedeTerritoryReward;
};

export type PoliceRaidEvent = EventBase & {
  type: 'police-raid';
  playerId: PlayerId;
  territoryId: TerritoryId;
  policePower: number;
  effectiveDefense: number;
  outcome: PoliceRaidOutcome;
};

export type PatrolCarMovedEvent = EventBase & {
  type: 'patrol-car-moved';
  fromTerritoryId: TerritoryId;
  toTerritoryId: TerritoryId;
};

export type GameFinishedEvent = EventBase & {
  type: 'game-finished';
  winnerId: PlayerId;
};

export type GameEvent =
  | SetupDiceRolledEvent
  | CharacterSelectedEvent
  | ResourcesProducedEvent
  | TerritoryAcquiredEvent
  | TerritoryAttackedEvent
  | TerritorySabotagedEvent
  | BusinessBuiltEvent
  | BusinessUpgradedEvent
  | TerritoryCededEvent
  | PoliceRaidEvent
  | PatrolCarMovedEvent
  | GameFinishedEvent;

export type GameEventType = GameEvent['type'];
