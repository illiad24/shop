export interface ProductType {
  _id: string;
  title: string;
  description: string;
  category: "MARINATED" | "CHILLED" | "FROZEN" | "SMOKED";
  price: number;
  portionWeightGrams: number;
  countPerPortion: number;
  stockPortions: number;
  isActive: boolean;
}
