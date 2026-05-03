import { axiosWithAuth } from "@/src/shared/api/api.interceptor";
import type { IUser } from "@/src/types/user.interface";

class UsersService {
  async getProfile() {
    const { data } = await axiosWithAuth<IUser>({
      url: "/users/profile",
      method: "GET",
    });

    return data;
  }
}

export const usersService = new UsersService();
