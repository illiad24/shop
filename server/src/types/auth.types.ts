export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
}
