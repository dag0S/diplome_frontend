import type { FC } from "react";

import { cn } from "@/src/shared/lib";
import { Container } from "../../Container";
import { AuthCard } from "../../AuthCard";
import { RegisterForm } from "./RegisterForm";

interface Props {
  className?: string;
}

export const Register: FC<Props> = ({ className }) => {
  return (
    <section
      className={cn("h-full flex justify-center items-center pt-16", className)}
    >
      <Container>
        <AuthCard title="Регистрация">
          <RegisterForm />
        </AuthCard>
      </Container>
    </section>
  );
};
