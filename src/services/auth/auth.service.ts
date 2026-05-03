import { axiosClassic, axiosWithAuth } from "@/src/shared/api/api.interceptor";

import { removeFromStorage, saveToStorage } from "./auth-token.service";
import type {
  ILoginForm,
  IAuthResponse,
  IRegisterForm,
  ISetup2FAResponse,
} from "../../types/auth.interface";
import { IVerifyEmailForm } from "@/src/components/VerifyEmail/ui/VerifyEmailForm";
import { IEnable2FAForm } from "@/src/components/PersonalAccountPatient/ui/PersonalAccountPatient";

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
    const res = await axiosClassic<{ message: string }>({
      url: "/auth/register",
      method: "POST",
      data,
    });

    return res.data;
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
    const res = await axiosClassic<{ message: string }>({
      url: "/auth/logout",
      method: "POST",
    });

    if (res.data) {
      removeFromStorage();
    }

    return res.data;
  }

  async verifyEmail(data: IVerifyEmailForm) {
    const res = await axiosClassic<IAuthResponse>({
      url: "/auth/verify-otp",
      method: "POST",
      data,
    });

    if (res.data.accessToken) {
      saveToStorage(res.data.accessToken);
    }

    return res;
  }

  async setup2FA() {
    const { data } = await axiosWithAuth<ISetup2FAResponse>({
      url: "/auth/setup-2fa",
      method: "POST",
    });

    return data;
  }

  async enable2FA(data: { code: string; userId: string }) {
    const { data: enable2FAData } = await axiosWithAuth<{ message: string }>({
      url: "/auth/enable-2fa",
      method: "POST",
      data,
    });

    return enable2FAData;
  }

  async disable2FA(data: { code: string; userId: string }) {
    const { data: disable2FAData } = await axiosWithAuth<{ message: string }>({
      url: "/auth/disable-2fa",
      method: "POST",
      data,
    });

    return disable2FAData;
  }

  async verify2FA(data: { code: string; email: string }) {
    const res = await axiosClassic<IAuthResponse>({
      url: "/auth/verify-2fa",
      method: "POST",
      data,
    });

    if (res.data.accessToken) {
      saveToStorage(res.data.accessToken);
    }

    return res;
  }
}

export const authService = new AuthService();
