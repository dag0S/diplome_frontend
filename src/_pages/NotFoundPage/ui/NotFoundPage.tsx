import type { FC } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/src/components/Container";
import { Button } from "@/src/shared/shadcn/ui/button";

export const metadata: Metadata = {
  title: "404 — Страница не найдена",
};

const NotFoundPage: FC = () => {
  return (
    <section className="py-6 md:py-12">
      <Container className="flex flex-col items-center gap-4">
        <h2 className="text-8xl font-bold">404</h2>
        <div className="text-lg md:text-xl text-center">
          Похоже, мы не можем найти нужную Вам страницу.
        </div>
        <Link href="/">
          <Button size="lg">На главную</Button>
        </Link>
      </Container>
    </section>
  );
};

export default NotFoundPage;
