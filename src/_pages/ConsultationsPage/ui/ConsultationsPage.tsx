import type { FC } from "react";
import type { Metadata } from "next";

import { Consultations } from "@/src/components/Consultations";

export const metadata: Metadata = {
  title: "Мои консультации",
};

const ConsultationsPage: FC = () => {
  return <Consultations />;
};

export default ConsultationsPage;
