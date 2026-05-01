import type { FC } from "react";

import { Container } from "../../Container";
import { LoginForm } from "./LoginForm";
import { AuthCard } from "../../AuthCard";

export const Login: FC = () => {
  return (
    <section className="h-full flex justify-center items-center pt-16">
      <Container>
        <AuthCard title="Вход">
          <LoginForm />
        </AuthCard>
      </Container>
    </section>
  );
};
