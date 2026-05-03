import type { FC } from "react";
import type { Metadata } from "next";

import { PersonalAccountPatient } from "@/src/components/PersonalAccountPatient";

export const metadata: Metadata = {
  title: "Личный кабинет пациента",
};

const PersonalAccountPatientPage: FC = () => {
  return <PersonalAccountPatient />;
};

export default PersonalAccountPatientPage;
