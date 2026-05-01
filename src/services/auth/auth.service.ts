import { axiosClassic } from "@/src/shared/api/api.interceptor";

import { removeFromStorage, saveToStorage } from "./auth-token.service";
import type {
  ILoginForm,
  IAuthResponse,
  IRegisterForm,
} from "../../types/auth.interface";
import { IVerifyEmailForm } from "@/src/components/VerifyEmail/ui/VerifyEmailForm";

class AuthService {
  async login(data: ILoginForm) {
    const res = await axiosClassic<IAuthResponse>({
      url: "/auth/login",
      method: "POST",
      data,
    });

    if (res.data.accessToken) {
      saveToStorage(res.data.accessToken);
    }

    return res;
  }

  async register(data: IRegisterForm) {
    const res = await axiosClassic<IAuthResponse>({
      url: "/auth/register",
      method: "POST",
      data,
    });

    if (res.data.accessToken) {
      saveToStorage(res.data.accessToken);
    }

    return res;
  }

  async getNewTokens() {
    const res = await axiosClassic<IAuthResponse>({
      url: "/auth/refresh",
      method: "POST",
    });

    if (res.data.accessToken) {
      saveToStorage(res.data.accessToken);
    }

    return res;
  }

  async logout() {
    const res = await axiosClassic<IAuthResponse>({
      url: "/auth/logout",
      method: "POST",
    });

    if (res.data) {
      removeFromStorage();
    }

    return res;
  }

  async verifyEmail(data: IVerifyEmailForm) {
    const res = await axiosClassic<IAuthResponse>({
      url: "/auth/verify-otp",
      method: "POST",
      data,
    });

    if (res.data) {
      removeFromStorage();
    }

    return res;
  }
}

export const authService = new AuthService();
