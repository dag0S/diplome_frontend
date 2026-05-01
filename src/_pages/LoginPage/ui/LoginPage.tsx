import type { FC } from "react";
import type { Metadata } from "next";
import { Login } from "@/src/components/Login";

export const metadata: Metadata = {
  title: "Вход",
};

const LoginPage: FC = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
