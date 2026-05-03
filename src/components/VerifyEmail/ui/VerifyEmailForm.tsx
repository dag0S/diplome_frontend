"use client";

import type { FC } from "react";
import { useRouter } from "next/navigation";
import z, { email } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/src/shared/lib";
import { authService } from "@/src/services/auth/auth.service";
import { Field, FieldError, FieldLabel } from "@/src/shared/shadcn/ui/field";
import { Button } from "@/src/shared/shadcn/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/shared/shadcn/ui/input-otp";

interface Props {
  className?: string;
  email: string;
}

const verifyEmailFormSchema = z.object({
  otp: z.string(),
  email: z.email("Некорректный формат почты: example@mail.ru"),
});

export type IVerifyEmailForm = z.infer<typeof verifyEmailFormSchema>;

export const VerifyEmailForm: FC<Props> = ({ className, email }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<IVerifyEmailForm>({
    resolver: zodResolver(verifyEmailFormSchema),
    defaultValues: {
      otp: "",
      email,
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth user profile"],
    mutationFn: (data: IVerifyEmailForm) => authService.verifyEmail(data),
    onSuccess() {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["profile"] });
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
      id="verify-email-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-4", className)}
    >
      <Controller
        name="otp"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="w-full">
            <FieldLabel htmlFor="verify-email-form-otp">
              Одноразовый код
            </FieldLabel>
            <InputOTP
              maxLength={6}
              id="verify-email-form-otp"
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
            {fieldState.error && <FieldError errors={[fieldState.error]} />}
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
