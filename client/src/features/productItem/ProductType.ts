export type ProductCategory =
  | "CHILLED"
  | "FROZEN"
  | "READY"
  | "MARINATED"
  | "SNACKS";

export interface ProductType {
  _id: string;
  title: string;
  description: string;
  category: ProductCategory;
  price: number;
  portionWeightGrams: number;
  countPerPortion: number;
  stockPortions: number;
  isActive: boolean;
  label: string;
}
