import { IProduct } from "../models/Product/product.interface";
import ProductModel from "../models/Product/product.model";
import { MongooseCRUDManager } from "../utils/MongooseCRUDManager";

class ProductService extends MongooseCRUDManager<IProduct> {}

export default new ProductService(ProductModel);
