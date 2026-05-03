"use client";

import type { FC } from "react";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

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
import { consultationsService } from "@/src/services/consultations/consultations.service";
import { Spinner } from "@/src/shared/shadcn/ui/spinner";
import { useProfile } from "@/src/hooks/useProfile";
import { Role } from "@/src/types/role.enum";

interface Props {
  className?: string;
}

export const Consultations: FC<Props> = ({ className }) => {
  const { data: consultations, isLoading } = useQuery({
    queryKey: ["consultaions"],
    queryFn: () => consultationsService.getAll(),
  });

  const { user } = useProfile();

  return (
    <section className={cn("py-6 md:py-12", className)}>
      <Container className="max-w-3xl">
        <div className="mb-6 flex justify-between">
          <h2 className="text-3xl font-semibold">Мои консультации</h2>
          {user?.role === Role.PATIENT ? (
            <Button>
              Записаться <Plus />
            </Button>
          ) : null}
        </div>
        <div className="flex flex-col gap-6">
          {isLoading ? (
            <Spinner className="size-18 text-primary mx-auto" />
          ) : (
            consultations?.data &&
            consultations.data.length > 0 &&
            consultations.data.map((consultation) => (
              <Link
                href={`/consultations/${consultation.id}`}
                key={consultation.id}
              >
                <Card className="hover:shadow-lg">
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-8">
                      <Avatar className="h-32 w-32 self-center md:self-auto">
                        <AvatarImage
                          src={
                            user?.role === Role.PATIENT
                              ? "/doctor.jpg"
                              : "/patient.jpg"
                          }
                          alt={user?.role === Role.PATIENT ? "врач" : "пациент"}
                        />
                        <AvatarFallback>User</AvatarFallback>
                      </Avatar>
                      <div className="w-full">
                        <div className="text-muted-foreground mb-2 ">
                          Онлайн-консультация
                        </div>
                        <div className="text-lg">
                          Ваш {user?.role === Role.PATIENT ? "врач" : "пациент"}
                          :
                        </div>
                        <h3 className="text-2xl font-semibold mb-2">
                          {user?.role === Role.PATIENT
                            ? `${consultation.doctor.lastName} ${consultation.doctor.firstName} ${consultation.doctor.middleName}`
                            : `${consultation.patient.lastName} ${consultation.patient.firstName} ${consultation.patient.middleName}`}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-xl mb-4">
                          {user?.role === Role.PATIENT ? (
                            <>
                              <div>Терапевт</div>
                              <Separator orientation="vertical" />
                            </>
                          ) : null}
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
            ))
          )}
        </div>
      </Container>
    </section>
  );
};
