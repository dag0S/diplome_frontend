import { Suspense, type FC } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";

import { VerifyEmail } from "@/src/components/VerifyEmail";

export const metadata: Metadata = {
  title: "Подтверждение почты",
};

const VerifyEmailPage: FC = async () => {
  await connection();

  return (
    <Suspense fallback={<>...</>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default VerifyEmailPage;
