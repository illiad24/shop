export type ProductCategory =
  | "CHILLED"
  | "FROZEN"
  | "READY"
  | "MARINATED"
  | "SNACKS";

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  CHILLED: "Охолоджена продукція",
  FROZEN: "Заморозка",
  READY: "Готова продукція",
  MARINATED: "Маринована продукція",
  SNACKS: "Снеки",
};
export interface IProduct {
  id: string;
  title: string;
  description?: string;
  category: ProductCategory;
  price: number;
  portionWeightGrams: number;
  countPerPortion?: string;
  stockPortions: number;
  isActive: boolean;
}
