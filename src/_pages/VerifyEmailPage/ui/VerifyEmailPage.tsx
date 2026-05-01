import type { FC } from "react";
import type { Metadata } from "next";

import { VerifyEmail } from "@/src/components/VerifyEmail";

export const metadata: Metadata = {
  title: "Подтверждение почты",
};

const VerifyEmailPage: FC = () => {
  return <VerifyEmail />;
};

export default VerifyEmailPage;
