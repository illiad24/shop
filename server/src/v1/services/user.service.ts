import { IUser } from "../models/User/user.interface";
import UserModel from "../models/User/user.model";
import { MongooseCRUDManager } from "../utils/MongooseCRUDManager";

class UserService extends MongooseCRUDManager<IUser> {
  async getUserById(id: string) {
    return super.getById(id, { password: 0, role: 0 }, []);
  }
}

export default new UserService(UserModel);
