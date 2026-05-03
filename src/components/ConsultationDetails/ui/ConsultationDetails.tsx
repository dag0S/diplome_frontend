"use client";

import { SubmitEvent, useState, type FC } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

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
import { useProfile } from "@/src/hooks/useProfile";
import { Role } from "@/src/types/role.enum";
import { consultationsService } from "@/src/services/consultations/consultations.service";
import { Spinner } from "@/src/shared/shadcn/ui/spinner";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

export const ConsultationDetails: FC<Props> = ({ className }) => {
  const { user } = useProfile();
  const { id: consultationId } = useParams();
  const [comments, setComments] = useState({ comments: "" });
  const [recommendations, setRecommendations] = useState({
    recommendations: "",
  });
  const queryClient = useQueryClient();

  const { data: consultation, isLoading } = useQuery({
    queryKey: ["consultation"],
    queryFn: () => consultationsService.getById(consultationId as string),
  });

  const { mutate: updateComments, isPending: isPendingComments } = useMutation({
    mutationKey: ["comments"],
    mutationFn: (data: { comments: string }) =>
      consultationsService.updateComments(consultationId as string, data),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["consultation"] });
      toast.success(data.data.message);
    },
    onError(error) {
      console.log(error);
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Ошибка при отправке комментария");
      }
    },
  });

  const onSubmitComments = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!comments.comments) {
      toast.error("Поле обязательно для заполнения");
      return;
    }

    updateComments(comments);
  };

  const { mutate: updateRecommendations, isPending: isPendingRecommendations } =
    useMutation({
      mutationKey: ["recommendations"],
      mutationFn: (data: { recommendations: string }) =>
        consultationsService.updateRecommendations(
          consultationId as string,
          data,
        ),
      onSuccess(data) {
        queryClient.invalidateQueries({ queryKey: ["consultation"] });
        toast.success(data.data.message);
      },
      onError(error) {
        console.log(error);
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("Ошибка при отправке рекомендаций");
        }
      },
    });

  const onSubmitRecommendations = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!recommendations.recommendations) {
      toast.error("Поле обязательно для заполнения");
      return;
    }

    updateRecommendations(recommendations);
  };

  return (
    <section className={cn("py-6 md:py-12", className)}>
      <Container className="max-w-3xl">
        <Link href="/consultations" className="mb-2 inline-block">
          <Button variant="ghost">
            <ArrowLeft />
            Назад
          </Button>
        </Link>
        {isLoading ? (
          <Spinner className="size-18 text-primary mx-auto" />
        ) : (
          consultation?.data && (
            <Card>
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
                      Ваш {user?.role === Role.PATIENT ? "врач" : "пациент"}:
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">
                      {user?.role === Role.PATIENT
                        ? `${consultation.data.doctor.lastName} ${consultation.data.doctor.firstName} ${consultation.data.doctor.middleName}`
                        : `${consultation.data.patient.lastName} ${consultation.data.patient.firstName} ${consultation.data.patient.middleName}`}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-xl mb-6">
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
                    <div className="mb-6 flex flex-col gap-3">
                      {user?.role === Role.DOCTOR &&
                        consultation.data.comments && (
                          <>
                            <h4 className="text-lg font-semibold">
                              Комметарий пациента:
                            </h4>
                            <div>{consultation.data.comments}</div>
                          </>
                        )}
                      {user?.role === Role.PATIENT ? (
                        consultation.data.comments ? (
                          <>
                            <h4 className="text-lg font-semibold">
                              Комметарий пациента:
                            </h4>
                            <div>{consultation.data.comments}</div>
                          </>
                        ) : (
                          <>
                            <h4 className="text-lg font-semibold">
                              Комметарий пациента:
                            </h4>
                            <div>
                              <form onSubmit={onSubmitComments}>
                                <Textarea
                                  placeholder="Оставьте комментарий врачу"
                                  className="mb-2"
                                  value={comments.comments}
                                  onChange={(e) =>
                                    setComments((prev) => ({
                                      ...prev,
                                      comments: e.target.value,
                                    }))
                                  }
                                  minLength={2}
                                  maxLength={300}
                                />
                                <Button
                                  disabled={
                                    !comments.comments || isPendingComments
                                  }
                                  type="submit"
                                >
                                  Отправить
                                </Button>
                              </form>
                            </div>
                          </>
                        )
                      ) : consultation.data.recommendations ? (
                        <>
                          <h4 className="text-lg font-semibold">
                            Рекомендации врача:
                          </h4>
                          <div>{consultation.data.recommendations}</div>
                        </>
                      ) : (
                        <>
                          <h4 className="text-lg font-semibold">
                            Рекомендации врача:
                          </h4>
                          <div>
                            <form onSubmit={onSubmitRecommendations}>
                              <Textarea
                                placeholder="Оставьте рекомендации пациенту"
                                className="mb-2"
                                value={recommendations.recommendations}
                                onChange={(e) =>
                                  setRecommendations((prev) => ({
                                    ...prev,
                                    recommendations: e.target.value,
                                  }))
                                }
                                minLength={2}
                                maxLength={300}
                              />
                              <Button
                                disabled={
                                  !recommendations.recommendations ||
                                  isPendingRecommendations
                                }
                                type="submit"
                              >
                                Отправить
                              </Button>
                            </form>
                          </div>
                        </>
                      )}
                      {user?.role === Role.PATIENT &&
                        consultation.data.recommendations && (
                          <>
                            <h4 className="text-lg font-semibold">
                              Рекомендации врача:
                            </h4>
                            <div>{consultation.data.recommendations}</div>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </Container>
    </section>
  );
};
