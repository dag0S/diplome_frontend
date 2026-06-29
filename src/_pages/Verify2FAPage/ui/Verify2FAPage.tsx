import { Suspense, type FC } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";

import { Verify2FA } from "@/src/components/Verify2FA";

export const metadata: Metadata = {
  title: "Двухфакторная аутентификация",
};

const Verify2FAPage: FC = async () => {
  await connection();

  return (
    <Suspense fallback={<>...</>}>
      <Verify2FA />
    </Suspense>
  );
};

export default Verify2FAPage;
