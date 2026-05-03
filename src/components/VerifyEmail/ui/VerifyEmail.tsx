"use client";

import type { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/src/shared/lib";
import { Container } from "../../Container";
import { AuthCard } from "../../AuthCard";
import { VerifyEmailForm } from "./VerifyEmailForm";

interface Props {
  className?: string;
}

export const VerifyEmail: FC<Props> = ({ className }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email");

  if (!email) {
    router.replace("/");
    return null;
  }

  return (
    <section
      className={cn("h-full flex justify-center items-center py-16", className)}
    >
      <Container>
        <AuthCard
          title="Подтверждение почты"
          description={
            <>
              Одноразовый код отправлен на почту <b>{email}</b>. Введите его
              ниже, чтобы продолжить.
            </>
          }
        >
          <VerifyEmailForm email={email} />
        </AuthCard>
      </Container>
    </section>
  );
};
