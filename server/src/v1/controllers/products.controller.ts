import { Request, Response } from "express";
import ProductService from "../services/product.service";
import { IProductsFilter } from "../../types/products.filter";

class ProductController {
  static async getAll(req: Request, res: Response) {
    try {
      const userQuery = req.query;
      const products = await ProductService.getList(userQuery);

      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async getById(req: Request, res: Response) {
    try {
      const productId = req.params.productId as string;
      const product = await ProductService.getById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const productData = req.body;
      const newProduct = await ProductService.create(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const productId = req.params.productId as string;
      const updateData = req.body;
      const updatedProduct = await ProductService.update(productId, updateData);
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const productId = req.params.productId as string;
      await ProductService.deleteById(productId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default ProductController;
