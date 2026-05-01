import type { FC } from "react";
import type { Metadata } from "next";
import { Register } from "@/src/components/Register";

export const metadata: Metadata = {
  title: "Регистрация",
};

const RegisterPage: FC = () => {
  return <Register />;
};

export default RegisterPage;
