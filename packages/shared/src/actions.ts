import type { BusinessId, BusinessType } from './business.js';
import type { CharacterId } from './character.js';
import type { PlayerId } from './player.js';
import type { ResourceCost } from './resources.js';
import type { TerritoryId } from './territory.js';

// Influence and gang members thrown into an acquisition or attack.
// Acquisition Power = influence + gangMembers × 1.5; Attack Power = influence + gangMembers × 2.
export type PowerCommitment = {
  influence: number;
  gangMembers: number;
};

export type SabotageMode = 'weaken' | 'stir-up';

export type CedeTerritoryReward = 'reduce-police-attention' | 'favors';

type ActionBase = {
  playerId: PlayerId;
};

// Setup

export type SelectCharacterAction = ActionBase & {
  type: 'select-character';
  characterId: CharacterId;
};

// Planning

export type InvestDefenseAction = ActionBase & {
  type: 'invest-defense';
  territoryId: TerritoryId;
  resources: ResourceCost;
};

// Execution

export type ExpandAction = ActionBase & {
  type: 'expand';
  territoryId: TerritoryId;
  // Owned adjacent territory the expansion starts from (Transport bonus applies to it).
  sourceTerritoryId: TerritoryId;
  commitment: PowerCommitment;
};

export type InfiltrateAction = ActionBase & {
  type: 'infiltrate';
  territoryId: TerritoryId;
  commitment: PowerCommitment;
};

export type AttackAction = ActionBase & {
  type: 'attack';
  territoryId: TerritoryId;
  commitment: PowerCommitment;
};

export type SabotageAction = ActionBase & {
  type: 'sabotage';
  territoryId: TerritoryId;
  mode: SabotageMode;
  gangMembers: number;
};

export type BuildBusinessAction = ActionBase & {
  type: 'build-business';
  territoryId: TerritoryId;
  businessType: BusinessType;
};

export type UpgradeBusinessAction = ActionBase & {
  type: 'upgrade-business';
  territoryId: TerritoryId;
  businessId: BusinessId;
};

export type CedeTerritoryAction = ActionBase & {
  type: 'cede-territory';
  territoryId: TerritoryId;
  reward: CedeTerritoryReward;
};

// Any phase

export type ConfirmReadyAction = ActionBase & {
  type: 'confirm-ready';
};

export type GameAction =
  | SelectCharacterAction
  | InvestDefenseAction
  | ExpandAction
  | InfiltrateAction
  | AttackAction
  | SabotageAction
  | BuildBusinessAction
  | UpgradeBusinessAction
  | CedeTerritoryAction
  | ConfirmReadyAction;

export type GameActionType = GameAction['type'];
