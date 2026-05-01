"use client";

import type { FC } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { cn } from "@/src/shared/lib";
import { authService } from "@/src/services/auth/auth.service";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/shared/shadcn/ui/field";
import { Input } from "@/src/shared/shadcn/ui/input";
import { Button } from "@/src/shared/shadcn/ui/button";
import { Role } from "@/src/types/role.enum";
import { RadioGroup, RadioGroupItem } from "@/src/shared/shadcn/ui/radio-group";

interface Props {
  className?: string;
}

const registerFormSchema = z
  .object({
    email: z.email("Некорректный формат почты: example@mail.ru"),
    firstName: z.string("Имя обязательно для заполнения"),
    lastName: z.string("Фамилия обязательна для заполнения"),
    middleName: z.string("Отчество должено быть строкой").optional(),
    role: z.enum(
      Role,
      "Роль должна быть одной из следующих: " + Object.values(Role).join(", "),
    ),
    password: z
      .string("Пароль обязателен для заполнения")
      .min(8, "Пароль должен быть не менее 8 символов")
      .regex(/[A-Z]/, "Должна быть хотя бы одна заглавная буква")
      .regex(/[a-z]/, "Должна быть хотя бы одна строчная буква")
      .regex(/[0-9]/, "Должна быть хотя бы одна цифра")
      .regex(/[^A-Za-z0-9]/, "Должен быть хотя бы один специальный символ"),
    confirmPassword: z.string("Подтверждение пароль обязателен для заполнения"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type IRegisterForm = z.infer<typeof registerFormSchema>;

export const RegisterForm: FC<Props> = ({ className }) => {
  const router = useRouter();

  const form = useForm<IRegisterForm>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      role: Role.PATIENT,
      email: "",
      lastName: "",
      firstName: "",
      middleName: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["auth user"],
    mutationFn: (data: IRegisterForm) => authService.register(data),
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

  const onSubmit: SubmitHandler<IRegisterForm> = (data) => {
    mutate(data);
  };

  return (
    <form
      id="register-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-4", className)}
    >
      <FieldGroup className="gap-3">
        <Controller
          name="role"
          control={form.control}
          defaultValue={Role.PATIENT}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Кто вы?</FieldLabel>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-col gap-2 mt-2"
              >
                <label
                  htmlFor="role-patient"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <RadioGroupItem id="role-patient" value={Role.PATIENT} />
                  <span>Пациент</span>
                </label>
                <label
                  htmlFor="role-doctor"
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <RadioGroupItem id="role-doctor" value={Role.DOCTOR} />
                  <span>Доктор</span>
                </label>
              </RadioGroup>
              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form-email">Почта</FieldLabel>
              <Input
                {...field}
                id="register-form-email"
                aria-invalid={fieldState.invalid}
                placeholder="Введите почту"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="lastName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form-last-name">Фамилия</FieldLabel>
              <Input
                {...field}
                id="register-form-last-name"
                aria-invalid={fieldState.invalid}
                placeholder="Введите фамилию"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="firstName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form-first-name">Имя</FieldLabel>
              <Input
                {...field}
                id="register-form-first-name"
                aria-invalid={fieldState.invalid}
                placeholder="Введите имя"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="middleName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form-middle-name">
                Отчество
              </FieldLabel>
              <Input
                {...field}
                id="register-middle-name"
                aria-invalid={fieldState.invalid}
                placeholder="Введите отчество"
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
              <FieldLabel htmlFor="register-form-password">Пароль</FieldLabel>
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
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="register-form-confirm-password">
                Подтвержение пароля
              </FieldLabel>
              <Input
                {...field}
                id="login-form-confirm-password"
                aria-invalid={fieldState.invalid}
                placeholder="Введите подтвержение пароля"
                autoComplete="off"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" className="w-full" disabled={isPending}>
        Зарегистрироваться
      </Button>
      <div className="text-center">Уже есть аккаунта?</div>
      <Link href="/login">
        <Button variant="secondary" className="w-full" disabled={isPending}>
          Войти
        </Button>
      </Link>
    </form>
  );
};
