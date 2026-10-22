export type BusinessId = string;

// Provisional set taken from the overview; the MVP rules don't define businesses yet.
export const BUSINESS_TYPES = ['kiosk', 'bar'] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];

export type Business = {
  id: BusinessId;
  type: BusinessType;
  level: number;
};
