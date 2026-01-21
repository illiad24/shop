import { Request, Response } from "express";
import ProductService from "../services/product.service";

class ProductController {
  static async getAll(req: Request, res: Response) {
    try {
      const products = await ProductService.getList();
      res.json(products);
    } catch (error) {
      throw new Error("Error fetching products");
    }
  }
  static async getById(req: Request, res: Response) {
    try {
      const productId = req.params.productId;
      if (typeof productId !== "string") {
        throw new Error("Invalid productId");
      }
      const product = await ProductService.getById(productId);
      res.json(product);
    } catch (error) {
      throw new Error("Error fetching product by ID");
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const productData = req.body;
      const newProduct = await ProductService.create(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      throw new Error("Error creating product");
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const productId = req.params.productId;
      const updateData = req.body;
      if (typeof productId !== "string") {
        throw new Error("Invalid productId");
      }
      const updatedProduct = await ProductService.update(productId, updateData);
      res.json(updatedProduct);
    } catch (error) {
      throw new Error("Error updating product");
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const productId = req.params.productId;
      if (typeof productId !== "string") {
        throw new Error("Invalid productId");
      }
      await ProductService.deleteById(productId);
      res.status(204).send();
    } catch (error) {
      throw new Error("Error deleting product");
    }
  }
}

export default ProductController;
