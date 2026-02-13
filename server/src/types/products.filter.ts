import { ProductCategory } from "../v1/models/Product/product.interface";

export interface IProductsFilter {
  search?: string;
  category?: ProductCategory;
  sort?: "newest" | "price_asc" | "price_desc";
}
