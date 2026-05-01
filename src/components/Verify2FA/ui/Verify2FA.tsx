import type { FC } from "react";

import { cn } from "@/src/shared/lib";
import { Container } from "../../Container";
import { AuthCard } from "../../AuthCard";
import { Verify2FAForm } from "./Verify2FAForm";

interface Props {
  className?: string;
}

export const Verify2FA: FC<Props> = ({ className }) => {
  return (
    <section
      className={cn("h-full flex justify-center items-center py-16", className)}
    >
      <Container>
        <AuthCard
          title="Двухфакторная аутентификация"
          description="Введите шестизначный код TOTP, созданный в вашем приложении для аутентификации."
        >
          <Verify2FAForm />
        </AuthCard>
      </Container>
    </section>
  );
};
