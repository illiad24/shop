import {
  Model,
  UpdateQuery,
  ProjectionType,
  PopulateOptions,
  Types,
} from "mongoose";
import { IProductsFilter } from "../../types/products.filter";

export class MongooseCRUDManager<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  // ======================
  // GET LIST
  // ======================
  async getList(
    filters: any,
    projection?: ProjectionType<T>,
    populate?: string[],
  ): Promise<T[]> {
    const query = this.model.find(filters, projection);

    if (populate) {
      populate.forEach((field: string) => query.populate(field));
    }

    return query.lean<T[]>().exec();
  }

  // ======================
  // CREATE
  // ======================
  async create(data: Partial<T>): Promise<T> {
    const doc = await this.model.create(data);
    return doc.toObject();
  }

  // ======================
  // GET BY ID
  // ======================
  async getById(
    id: string | Types.ObjectId,
    projection?: ProjectionType<T>,
    populate?: string[],
  ) {
    const query = this.model.findById(id, projection);

    if (populate) {
      populate.forEach((field) => query.populate(field));
    }

    return query.lean().exec();
  }

  // ======================
  // FIND ONE
  // ======================
  async findOne(
    filters: object,
    projection?: ProjectionType<T>,
    populate?: string[],
  ): Promise<T | null> {
    const query = this.model.findOne(filters, projection);

    if (populate) {
      populate.forEach((field) => query.populate(field));
    }

    return query.lean<T | null>().exec();
  }

  // ======================
  // UPDATE
  // ======================
  async update(
    id: string | Types.ObjectId,
    data: UpdateQuery<T>,
  ): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      })
      .lean<T | null>()
      .exec();
  }

  // ======================
  // DELETE
  // ======================
  async deleteById(id: string | Types.ObjectId): Promise<boolean> {
    const res = await this.model.deleteOne({ _id: id }).exec();
    return res.deletedCount === 1;
  }
}
