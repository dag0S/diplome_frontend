import { Role } from "./role.enum";

export interface IConsultation {
  id: string;
  comments?: string;
  recommendations?: string;
  doctor: {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    role: Role;
  };
  patient: {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    role: Role;
  };
}
