import type { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogIn } from "lucide-react";

import { Container } from "../../Container";
import { Button } from "@/src/shared/shadcn/ui/button";

export const Header: FC = () => {
  return (
    <header className="py-2 shadow-sm bg-background">
      <Container className="flex justify-between items-center gap-6">
        <Link href="/">
          <Image
            src="/icons/logo.svg"
            width={123}
            height={44}
            alt="Дипломный проект"
            loading="eager"
          />
        </Link>
        <div className="flex gap-2">
          <Link href="/">
            <Button variant="ghost">Главная</Button>
          </Link>
          <Link href="/consultations">
            <Button variant="ghost">Мои консультации</Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost">
              Войти <LogIn />
            </Button>
          </Link>
        </div>
      </Container>
    </header>
  );
};
