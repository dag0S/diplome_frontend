import type { FC } from "react";
import { ArrowLeft } from "lucide-react";
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
import { Textarea } from "@/src/shared/shadcn/ui/textarea";

interface Props {
  className?: string;
}

export const ConsultationDetails: FC<Props> = ({ className }) => {
  return (
    <section className={cn("py-6 md:py-12", className)}>
      <Container className="max-w-3xl">
        <Link href="/consultations" className="mb-2 inline-block">
          <Button variant="ghost">
            <ArrowLeft />
            Назад
          </Button>
        </Link>
        <Card>
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
                <div className="flex flex-wrap gap-4 text-xl mb-6">
                  <div>Терапевт</div> <Separator orientation="vertical" />
                  <div>28.07.2026</div>
                  <Separator orientation="vertical" />
                  <div>17:00</div>
                  <Separator orientation="vertical" />
                  <div>30 мин</div>
                  <Separator orientation="vertical" />
                  <div>2.500 ₽</div>
                </div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold">
                    Комметарий пациента:
                  </h4>
                  <Textarea placeholder="Оставьте комментарий врачу" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Рекомендации врача:</h4>
                  <Textarea placeholder="Оставьте рекомендации пациенту" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </section>
  );
};
