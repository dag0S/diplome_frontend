"use client";

import { useState, type FC } from "react";
import { ArrowLeft, BadgeX, Verified } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QRCodeSVG } from "qrcode.react";
import { Spoiler } from "spoiled";
import z from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/src/shared/lib";
import { Container } from "../../Container";
import { Card, CardContent } from "@/src/shared/shadcn/ui/card";
import { Button } from "@/src/shared/shadcn/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/shared/shadcn/ui/avatar";
import { Separator } from "@/src/shared/shadcn/ui/separator";
import { useProfile } from "@/src/hooks/useProfile";
import { Spinner } from "@/src/shared/shadcn/ui/spinner";
import { Switch } from "@/src/shared/shadcn/ui/switch";
import { Label } from "@/src/shared/shadcn/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/shared/shadcn/ui/dialog";
import { authService } from "@/src/services/auth/auth.service";
import { Field, FieldError, FieldLabel } from "@/src/shared/shadcn/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/shared/shadcn/ui/input-otp";

interface Props {
  className?: string;
}

const enable2FAFormSchema = z.object({
  code: z.string().length(6, "Код должен содержать 6 цифр"),
});

export type IEnable2FAForm = z.infer<typeof enable2FAFormSchema>;

export const PersonalAccountDoctor: FC<Props> = ({ className }) => {
  const router = useRouter();
  const { user, isLoading } = useProfile();
  const [openEnableModal, setOpenEnableModal] = useState(false);
  const [openDisableModal, setOpenDisableModal] = useState(false);
  const queryClient = useQueryClient();

  const enabled = user?.isTwoFactorEnabled ?? false;

  const formEnable2FA = useForm<IEnable2FAForm>({
    resolver: zodResolver(enable2FAFormSchema),
    defaultValues: {
      code: "",
    },
    mode: "onChange",
  });

  const { mutate: enable2FA } = useMutation({
    mutationKey: ["2fa enable"],
    mutationFn: (data: IEnable2FAForm) =>
      authService.enable2FA({ ...data, userId: user?.id || "" }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      formEnable2FA.reset();
      toast.success(data.message);
      setOpenEnableModal(false);
    },
    onError(error) {
      formEnable2FA.reset();
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Ошибка при включении двухфакторной аутентификации");
      }
    },
  });

  const onSubmitEnable2FA: SubmitHandler<IEnable2FAForm> = (data) => {
    enable2FA(data);
  };

  const formDisable2FA = useForm<IEnable2FAForm>({
    resolver: zodResolver(enable2FAFormSchema),
    defaultValues: {
      code: "",
    },
    mode: "onChange",
  });

  const { mutate: disable2FA } = useMutation({
    mutationKey: ["2fa enable"],
    mutationFn: (data: IEnable2FAForm) =>
      authService.disable2FA({ ...data, userId: user?.id || "" }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      formDisable2FA.reset();
      toast.success(data.message);
      setOpenDisableModal(false);
    },
    onError(error) {
      formDisable2FA.reset();
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Ошибка при выключении двухфакторной аутентификации");
      }
    },
  });

  const onSubmitDisable2FA: SubmitHandler<IEnable2FAForm> = (data) => {
    disable2FA(data);
  };

  const { mutate: setup2FA, data: setupData } = useMutation({
    mutationKey: ["2fa setup"],
    mutationFn: () => authService.setup2FA(),
    onError(error) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Ошибка при настройке двухфакторной аутентификации");
      }
    },
  });

  const { mutate: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSuccess(data) {
      queryClient.setQueryData(["profile"], null);
      toast.success(data.message);
      router.replace("/login");
    },
    onError(error) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Ошибка при выходе из аккаунта");
      }
    },
  });

  const fio = `${user?.lastName} ${user?.firstName} ${user?.middleName}`;

  return (
    <section className={cn("py-6 md:py-12", className)}>
      <Container className="max-w-3xl">
        <Button className="mb-3" variant="ghost" onClick={() => router.back()}>
          <ArrowLeft />
          Назад
        </Button>
        {isLoading ? (
          <Spinner className="size-16 text-primary mx-auto" />
        ) : (
          <Card>
            <CardContent>
              <h2 className="text-3xl font-semibold mb-4 text-center">
                Личный кабинет <span className="text-primary">врача</span>
              </h2>
              <Separator className="mb-4" />
              <div className="flex flex-col md:flex-row gap-8">
                <div className="self-center md:self-auto">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src="/doctor.jpg" alt="Врач" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => logout()}
                  >
                    Выйти
                  </Button>
                </div>
                <div className="w-full">
                  <h4 className="text-2xl font-semibold mb-2">{fio}</h4>
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="font-semibold">Почта:</div>
                      <div>{user?.email}</div>
                    </div>
                    <div>
                      <div className="font-semibold">Специальность:</div>
                      <div>Терапевт</div>
                    </div>
                    {user?.isEmailVerified ? (
                      <div className="flex gap-1 items-center">
                        Почта подтверждена <Verified className="text-primary" />
                      </div>
                    ) : (
                      <div className="flex gap-1 items-center">
                        Почта не подтверждена
                        <BadgeX className="text-primary" />
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={enabled}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setOpenEnableModal(true);
                            setup2FA();
                          } else {
                            setOpenDisableModal(true);
                          }
                        }}
                        id="2fa"
                      />
                      <Label htmlFor="2fa">Двухфакторная аутентификация</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Dialog open={openEnableModal} onOpenChange={setOpenEnableModal}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Настройка двухфакторной аутентификации</DialogTitle>
              <DialogDescription>
                Отсканируйте QR-коде или введите секретный ключ вручную в Вашем
                приложении для аутентификации с помощью TOTP-кодов.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center">
              <QRCodeSVG value={setupData?.otpauthUrl || ""} size={200} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2 md:flex-row flex-col">
                <div className="font-semibold">Secret:</div>
                <Spoiler tagName="div" revealOn="click">
                  {setupData?.secret}
                </Spoiler>
              </div>
              <div className="flex gap-2 md:flex-row flex-col">
                <div className="font-semibold">Label:</div>
                <Spoiler tagName="div" revealOn="click">
                  {setupData?.label}
                </Spoiler>
              </div>
              <div className="flex gap-2 md:flex-row flex-col">
                <div className="font-semibold">Issuer:</div>
                <Spoiler tagName="div" revealOn="click">
                  {setupData?.issuer}
                </Spoiler>
              </div>
            </div>
            <form
              id="enable-2fa-form"
              onSubmit={formEnable2FA.handleSubmit(onSubmitEnable2FA)}
              className={cn("flex flex-col gap-4", className)}
            >
              <Controller
                name="code"
                control={formEnable2FA.control}
                render={({ field, fieldState }) => (
                  <Field className="w-full">
                    <FieldLabel htmlFor="enable-2fa-form-code">
                      Одноразовый TOTP-код
                    </FieldLabel>
                    <InputOTP
                      maxLength={6}
                      id="enable-2fa-form-code"
                      required
                      pattern="^\d+$"
                      style={{ width: "100%" }}
                      {...field}
                    >
                      <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-full *:data-[slot=input-otp-slot]:text-xl w-full">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Назад</Button>
              </DialogClose>
              <Button type="submit" form="enable-2fa-form">
                Отправить код
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={openDisableModal} onOpenChange={setOpenDisableModal}>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Выключение двухфакторной аутентификации</DialogTitle>
              <DialogDescription>
                Чтобы отключить двухфакторную аутентификацию, введите TOTP-код
                сгенерированный в вашем приложении для аутентификации.
              </DialogDescription>
            </DialogHeader>
            <form
              id="disable-2fa-form"
              onSubmit={formDisable2FA.handleSubmit(onSubmitDisable2FA)}
              className={cn("flex flex-col gap-4", className)}
            >
              <Controller
                name="code"
                control={formDisable2FA.control}
                render={({ field, fieldState }) => (
                  <Field className="w-full">
                    <FieldLabel htmlFor="disable-2fa-form-code">
                      Одноразовый TOTP-код
                    </FieldLabel>
                    <InputOTP
                      maxLength={6}
                      id="disable-2fa-form-code"
                      required
                      pattern="^\d+$"
                      style={{ width: "100%" }}
                      {...field}
                    >
                      <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-full *:data-[slot=input-otp-slot]:text-xl w-full">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </form>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Назад</Button>
              </DialogClose>
              <Button type="submit" form="disable-2fa-form">
                Отправить код
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Container>
    </section>
  );
};
