import type { FC } from "react";

import { cn } from "@/src/shared/lib";
import { Container } from "../../Container";
import { AuthCard } from "../../AuthCard";
import { VerifyEmailForm } from "./VerifyEmailForm";

interface Props {
  className?: string;
}

export const VerifyEmail: FC<Props> = ({ className }) => {
  return (
    <section
      className={cn("h-full flex justify-center items-center pt-16", className)}
    >
      <Container>
        <AuthCard title="Подтверждение почты">
          <VerifyEmailForm />
        </AuthCard>
      </Container>
    </section>
  );
};
