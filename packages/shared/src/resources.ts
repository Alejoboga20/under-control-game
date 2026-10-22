export const RESOURCE_KEYS = ['money', 'influence', 'gangMembers', 'favors'] as const;

export type ResourceKey = (typeof RESOURCE_KEYS)[number];

export type ResourcePool = {
  money: number;
  influence: number;
  gangMembers: number;
  favors: number;
};

// Amount of resources paid or committed by an action. Missing keys count as 0.
export type ResourceCost = Partial<ResourcePool>;
