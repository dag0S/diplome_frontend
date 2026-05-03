import type { FC } from "react";
import type { Metadata } from "next";

import { PersonalAccountDoctor } from "@/src/components/PersonalAccountDoctor";

export const metadata: Metadata = {
  title: "Личный кабинет врача",
};

const PersonalAccountDoctorPage: FC = () => {
  return <PersonalAccountDoctor />;
};

export default PersonalAccountDoctorPage;
