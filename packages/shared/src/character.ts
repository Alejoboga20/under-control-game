export const CHARACTER_IDS = ['banker', 'politician', 'union-leader', 'gordo-pyme'] as const;

export type CharacterId = (typeof CHARACTER_IDS)[number];

export type MafiaCharacter = {
  id: CharacterId;
  name: string;
  description: string;
};
