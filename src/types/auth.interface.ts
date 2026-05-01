import type { Role } from "./role.enum";

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  role: Role;
  password: string;
  confirmPassword: string;
}

export interface IAuthResponse {
  accessToken: string;
}
