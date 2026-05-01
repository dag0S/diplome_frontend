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
import { Field, FieldError, FieldLabel } from "@/src/shared/shadcn/ui/field";
import { Button } from "@/src/shared/shadcn/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/src/shared/shadcn/ui/input-otp";

interface Props {
  className?: string;
}

const verify2FAFormSchema = z.object({
  otp: z.string(),
});

export type IVerify2FAForm = z.infer<typeof verify2FAFormSchema>;

export const Verify2FAForm: FC<Props> = ({ className }) => {
  const router = useRouter();

  const form = useForm<IVerify2FAForm>({
    resolver: zodResolver(verify2FAFormSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth user"],
    mutationFn: (data: IVerify2FAForm) => authService.verifyEmail(data),
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

  const onSubmit: SubmitHandler<IVerify2FAForm> = (data) => {
    mutate(data);
  };

  return (
    <form
      id="verify-2fa-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-4", className)}
    >
      <Controller
        name="otp"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field className="w-full">
            <FieldLabel htmlFor="verify-2fa-form-totp">
              Одноразовый код
            </FieldLabel>
            <InputOTP
              maxLength={6}
              id="verify-2fa-form-totp"
              required
              pattern="^\d+$"
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
