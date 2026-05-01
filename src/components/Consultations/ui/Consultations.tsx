import type { FC } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { cn } from "@/src/shared/lib";
import { Container } from "../../Container";
import { Card, CardContent } from "@/src/shared/shadcn/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/shared/shadcn/ui/avatar";
import { Separator } from "@/src/shared/shadcn/ui/separator";
import { Button } from "@/src/shared/shadcn/ui/button";

interface Props {
  className?: string;
}

export const Consultations: FC<Props> = ({ className }) => {
  return (
    <section className={cn("py-6 md:py-12", className)}>
      <Container className="max-w-3xl">
        <h2 className="text-3xl font-semibold mb-6">Мои консультации</h2>
        <div className="flex flex-col gap-6">
          <Link href="/consultations/1">
            <Card className="hover:shadow-lg">
              <CardContent>
                <div className="flex flex-col md:flex-row gap-8">
                  <Avatar className="h-32 w-32 self-center md:self-auto">
                    <AvatarImage src="/doctor.jpg" alt="Врач" />
                    <AvatarFallback>ГД</AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <div className="text-muted-foreground mb-2 ">
                      Онлайн-консультация
                    </div>
                    <div className="text-lg">Ваш врач:</div>
                    <h3 className="text-2xl font-semibold mb-2">
                      Государев Данила Игоревич
                    </h3>
                    <div className="flex flex-wrap gap-4 text-xl mb-4">
                      <div>Терапевт</div> <Separator orientation="vertical" />
                      <div>28.07.2026</div>
                      <Separator orientation="vertical" />
                      <div>17:00</div>
                      <Separator orientation="vertical" />
                      <div>30 мин</div>
                      <Separator orientation="vertical" />
                      <div>2.500 ₽</div>
                    </div>
                    <Button className="md:w-fit px-10 w-full">
                      Подробнее <ArrowRight />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </Container>
    </section>
  );
};
