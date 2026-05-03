"use client";

import type { FC } from "react";
import z from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { cn } from "@/src/shared/lib";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/shadcn/ui/field";
import { Input } from "@/src/shared/shadcn/ui/input";
import { Button } from "@/src/shared/shadcn/ui/button";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/src/services/auth/auth.service";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

const loginFormSchema = z.object({
  email: z.email("Некорректный формат почты: example@mail.ru"),
  password: z.string().nonempty("Пароль обязателен для заполнения"),
});

type ILoginForm = z.infer<typeof loginFormSchema>;

export const LoginForm: FC<Props> = ({ className }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<ILoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth user"],
    mutationFn: (data: ILoginForm) => authService.login(data),
    onSuccess() {
      form.reset();
      toast.success("Вы вошли в систему");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      router.replace("/");
    },
    onError(error, dataForm) {
      if (error.message) {
        
        if (error.message === "Почта не подтверждена, код отправлен на почту") {
          toast.error(error.message);
          router.replace(`/verify-email?email=${dataForm.email}`);
        }
        
        if (error.message === "Включена двухфакторная аутентификация") {
          router.replace(`/verify-2fa?email=${dataForm.email}`);
        }

        toast.error(error.message);
      } else {
        toast.error("Ошибка при авторизации");
      }
    },
  });

  const onSubmit: SubmitHandler<ILoginForm> = (data) => {
    mutate(data);
  };

  return (
    <form
      id="login-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-4", className)}
    >
      <FieldGroup className="gap-3">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-form-email">Почта</FieldLabel>
              <Input
                {...field}
                id="login-form-email"
                aria-invalid={fieldState.invalid}
                placeholder="Введите почту"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-form-password">Пароль</FieldLabel>
              <Input
                {...field}
                id="login-form-password"
                aria-invalid={fieldState.invalid}
                placeholder="Введите пароль"
                autoComplete="off"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" className="w-full" disabled={isPending}>
        Войти
      </Button>
      <div className="text-center text-muted-foreground">Нет аккаунта?</div>
      <Link href="/register">
        <Button variant="secondary" className="w-full" disabled={isPending}>
          Зарегистрироваться
        </Button>
      </Link>
    </form>
  );
};
