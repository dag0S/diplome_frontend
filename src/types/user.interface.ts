import { Role } from "./role.enum";

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  role: Role;
  isEmailVerified: boolean;
  isTwoFactorEnabled: boolean;
}
