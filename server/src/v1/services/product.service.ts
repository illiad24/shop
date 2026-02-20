import { IProductsFilter } from "../../types/products.filter";
import { IProduct } from "../models/Product/product.interface";
import ProductModel from "../models/Product/product.model";
import { MongooseCRUDManager } from "../utils/MongooseCRUDManager";

class ProductService extends MongooseCRUDManager<IProduct> {
  async getList(filters?: any) {
    const filter: any = {};

    if (filters?.search && filters.search.trim() !== "") {
      filter.title = {
        $regex: filters.search,
        $options: "i",
      };
    }

    if (filters?.category) {
      filter.category = filters.category;
    }

    let query = ProductModel.find(filter);

    if (filters?.sort) {
      switch (filters.sort) {
        case "price_asc":
          query = query.sort({ price: 1 });
          break;

        case "price_desc":
          query = query.sort({ price: -1 });
          break;
        default:
          break;
      }
    }

    return query.lean().exec();
  }
}

export default new ProductService(ProductModel);
