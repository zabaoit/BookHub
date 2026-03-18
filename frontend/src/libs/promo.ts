export type PromoDefinition = {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  maxDiscount?: number;
  minSubtotal?: number;
};

export const PROMO_DEFINITIONS: PromoDefinition[] = [
  {
    code: "BOOKHUB10",
    type: "percentage",
    value: 10,
    maxDiscount: 50000,
    minSubtotal: 50000,
  },
];

export const findPromo = (rawCode: string): PromoDefinition | null => {
  const normalizedCode = rawCode.trim().toUpperCase();
  if (!normalizedCode) {
    return null;
  }
  return PROMO_DEFINITIONS.find((promo) => promo.code === normalizedCode) || null;
};

export const calculatePromoDiscount = (subtotal: number, promoCode?: string | null): number => {
  if (!promoCode || subtotal <= 0) {
    return 0;
  }

  const promo = findPromo(promoCode);
  if (!promo) {
    return 0;
  }

  if (promo.minSubtotal && subtotal < promo.minSubtotal) {
    return 0;
  }

  if (promo.type === "fixed") {
    return Math.max(0, Math.min(subtotal, promo.value));
  }

  const rawDiscount = Math.floor((subtotal * promo.value) / 100);
  const cappedDiscount = promo.maxDiscount ? Math.min(rawDiscount, promo.maxDiscount) : rawDiscount;
  return Math.max(0, Math.min(subtotal, cappedDiscount));
};
