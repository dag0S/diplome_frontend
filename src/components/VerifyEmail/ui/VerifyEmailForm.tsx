"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { cn } from "@/src/shared/lib";
import { authService } from "@/src/services/auth/auth.service";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/shadcn/ui/field";
import { Button } from "@/src/shared/shadcn/ui/button";
import { Input } from "@/src/shared/shadcn/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/shared/shadcn/ui/input-otp";

interface Props {
  className?: string;
}

const verifyEmailFormSchema = z.object({
  otp: z.string(),
});

export type IVerifyEmailForm = z.infer<typeof verifyEmailFormSchema>;

export const VerifyEmailForm: FC<Props> = ({ className }) => {
  const router = useRouter();

  const form = useForm<IVerifyEmailForm>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth user"],
    mutationFn: (data: IVerifyEmailForm) => authService.verifyEmail(data),
    onSuccess() {
      form.reset();
      toast.success("Вы вошли в систему");
      router.replace("/");
    },
    onError(error) {
      console.log(error);
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Ошибка при авторизации");
      }
    },
  });

  const onSubmit: SubmitHandler<IVerifyEmailForm> = (data) => {
    mutate(data);
  };

  return (
    <form
      id="login-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-4", className)}
    >
      <Controller
        name="otp"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field>
            <FieldLabel htmlFor="otp-verification">
              Verification code
            </FieldLabel>
            <InputOTP maxLength={6} id="otp-verification" required>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTP>
          </Field>
        )}
      />

      <Button type="submit" className="w-full" disabled={isPending}>
        Отправить код
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        disabled={isPending}
        onClick={() => router.back()}
      >
        Назад
      </Button>
    </form>
  );
};
