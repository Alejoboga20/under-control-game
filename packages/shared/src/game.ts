import type { GameEvent } from './events.js';
import type { Player, PlayerId } from './player.js';
import type { PoliceState } from './police.js';
import type { Territory, TerritoryId } from './territory.js';

export type GameId = string;

export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 4;
export const STANDARD_ROUNDS = 10;

export const GAME_PHASES = [
  'lobby',
  // Players roll a die and pick characters in descending roll order.
  'character-selection',
  'planning',
  'execution',
  'finished',
] as const;

export type GamePhase = (typeof GAME_PHASES)[number];

export type SetupState = {
  rolls: Record<PlayerId, number>;
  pickOrder: PlayerId[];
  currentPickIndex: number;
};

export type PlayerStanding = {
  playerId: PlayerId;
  rawScore: number;
  // Raw score normalized across all players, 0–100.
  controlPercent: number;
};

export type GameState = {
  id: GameId;
  // Short code other players use to join the game.
  joinCode: string;

  phase: GamePhase;
  // 0 during lobby and setup, 1-based once rounds start.
  round: number;
  // Starts at STANDARD_ROUNDS and grows by one per tie-breaker round.
  lastRound: number;
  // Epoch ms when the current timed phase ends, null for untimed phases.
  phaseEndsAt: number | null;

  players: Player[];
  territories: Record<TerritoryId, Territory>;
  police: PoliceState;
  setup: SetupState | null;

  // Seed for the engine's RNG so turn resolution stays deterministic.
  rngSeed: number;

  events: GameEvent[];
  standings: PlayerStanding[] | null;
  winnerId: PlayerId | null;
};
