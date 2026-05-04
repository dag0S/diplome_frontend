"use client";

import { SubmitEvent, useState, type FC } from "react";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/shared/shadcn/ui/dialog";
import { usersService } from "@/src/services/users/users.service";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/shadcn/ui/field";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/src/shared/shadcn/ui/select";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

export const Consultations: FC<Props> = ({ className }) => {
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useProfile();

  const {
    mutate: createConsultation,
    isPending: isPendingCreatingConsultation,
  } = useMutation({
    mutationKey: ["create consultation"],
    mutationFn: () =>
      consultationsService.create({
        doctorId: selectedDoctor,
        patientId: user?.id || "",
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["consultations"] });
      setIsOpenCreateModal(false);
      setSelectedDoctor("");
      toast.success(data.data.message);
    },
    onError(error) {
      console.log(error);
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Ошибка при записи");
      }
    },
  });

  const onSubmitBook = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("BOOK");
    if (!selectedDoctor) {
      toast.error("Поле обязательно для заполнения");
      return;
    }

    createConsultation();
  };

  const { data: consultations, isLoading } = useQuery({
    queryKey: ["consultations"],
    queryFn: () => consultationsService.getAll(),
  });

  const { data: doctors } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => usersService.getAllDoctors(),
  });

  return (
    <section className={cn("py-6 md:py-12", className)}>
      <Container className="max-w-3xl">
        <div className="mb-6 flex gap-2 justify-between flex-col sm:flex-row">
          <h2 className="text-3xl font-semibold">Мои консультации</h2>
          {user?.role === Role.PATIENT ? (
            <Dialog
              open={isOpenCreateModal}
              onOpenChange={setIsOpenCreateModal}
            >
              <form onSubmit={onSubmitBook} id="form-create-consultation">
                <DialogTrigger asChild>
                  <Button>
                    Записаться <Plus />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                  <DialogHeader>
                    <DialogTitle>Запись на приём к врачу</DialogTitle>
                    <DialogDescription>
                      Чтобы записаться на приём к врачу, выберите врача из
                      выпадающего списка и нажмите на «Записаться»
                    </DialogDescription>
                  </DialogHeader>
                  <Field>
                    <FieldContent>
                      <FieldLabel>Врач</FieldLabel>
                    </FieldContent>
                    <Select
                      name={selectedDoctor}
                      value={selectedDoctor}
                      onValueChange={setSelectedDoctor}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите врача" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Врачи</SelectLabel>
                          <SelectSeparator />
                          {doctors?.length &&
                            doctors.length > 0 &&
                            doctors.map((doctor) => (
                              <SelectItem key={doctor.id} value={doctor.id}>
                                {`${doctor.lastName} ${doctor.firstName} ${doctor.middleName} | Терапевт`}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Назад</Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      disabled={
                        !selectedDoctor || isPendingCreatingConsultation
                      }
                      form="form-create-consultation"
                    >
                      Записаться
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
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
