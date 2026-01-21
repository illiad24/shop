import { IUser } from "../models/User/user.interface";
import UserModel from "../models/User/user.model";
import { MongooseCRUDManager } from "../utils/MongooseCRUDManager";

class UserService extends MongooseCRUDManager<IUser> {
  async getUserById(id: string) {
    try {
      const res = await super.getById(id, { password: 0, role: 0 }, []);
      return res;
    } catch (error) {
      return [];
    }
  }
}

export default new UserService(UserModel);
