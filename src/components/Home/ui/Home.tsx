import type { FC } from "react";

import { Button } from "@/src/shared/shadcn/ui/button";
import { Container } from "../../Container";

export const Home: FC = () => {
  return (
    <section>
      <Container>
        <Button>Login</Button>
      </Container>
    </section>
  );
};
