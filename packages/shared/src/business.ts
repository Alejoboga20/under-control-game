export type BusinessId = string;

// Garito is illegal: high income, but raises Police Attention every round.
export const BUSINESS_TYPES = ['kiosk', 'bar', 'garito'] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];

export type Business = {
  id: BusinessId;
  type: BusinessType;
  level: number;
};
