export interface IUser {
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}
