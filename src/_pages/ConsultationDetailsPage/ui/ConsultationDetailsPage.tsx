import type { FC } from "react";
import type { Metadata } from "next";

import { ConsultationDetails } from "@/src/components/ConsultationDetails";

export const metadata: Metadata = {
  title: "Консультация",
};

const ConsultationDetailsPage: FC = () => {
  return <ConsultationDetails />;
};

export default ConsultationDetailsPage;
