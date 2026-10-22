import type { CharacterId } from './character.js';
import type { ResourcePool } from './resources.js';

export type PlayerId = string;

export const PLAYER_COLORS = ['red', 'blue', 'green', 'yellow'] as const;

export type PlayerColor = (typeof PLAYER_COLORS)[number];

export const MAX_POLICE_ATTENTION = 100;

export type Player = {
  id: PlayerId;
  name: string;
  color: PlayerColor;
  characterId: CharacterId | null;

  resources: ResourcePool;
  // 0–100. Negative metric that drives the chance of a police raid.
  policeAttention: number;

  // Number of territories acquired this round, used for progressive expansion costs.
  acquisitionsThisRound: number;

  // Whether the player has confirmed they are done with the current phase.
  isReady: boolean;
  isConnected: boolean;
};
