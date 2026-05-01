import type { FC } from "react";
import type { Metadata } from "next";

import { Verify2FA } from "@/src/components/Verify2FA";

export const metadata: Metadata = {
  title: "Двухфакторная аутентификация",
};

const Verify2FAPage: FC = () => {
  return <Verify2FA />;
};

export default Verify2FAPage;
