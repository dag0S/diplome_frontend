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
      className={cn("h-full flex justify-center items-center py-16", className)}
    >
      <Container>
        <AuthCard
          title="Подтверждение почты"
          description={
            <>
              Одноразовый код отправлен на почту{" "}
              <b>danidagosudarev@gmail.com</b>. Введите его ниже, чтобы
              продолжить.
            </>
          }
        >
          <VerifyEmailForm />
        </AuthCard>
      </Container>
    </section>
  );
};
