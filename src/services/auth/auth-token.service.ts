import Cookies from "js-cookie";

export enum EnumTokens {
  "ACCESS_TOKEN" = "access_token",
  "REFRESH_TOKEN" = "refresh_token",
}

export const getAccessToken = () => {
  const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN);
  return accessToken || null;
};

export const saveToStorage = (accessToken: string) => {
  Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
    domain: process.env.APP_DOMAIN,
    sameSite: "strict",
    expires: 1,
  });
};

export const removeFromStorage = () => {
  Cookies.remove(EnumTokens.ACCESS_TOKEN);
};
