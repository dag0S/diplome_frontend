import type { FC } from "react";

import { Container } from "../../Container";

export const Home: FC = () => {
  return (
    <section className="py-6 md:py-12">
      <Container className="max-w-3xl">
        <h1 className="text-xl font-semibold mb-4">
          Дипломный проект модели информационной безопасности для
          информационно-технологической системы «Докт24»
        </h1>
        <div className="text-lg font-semibold">Работу выполнил:</div>
        <div className="mb-4">Государев Данила Игоревич</div>
        <div className="text-lg font-semibold">Реализовано:</div>
        <ul className="list-disc pl-4 mb-4">
          <li>Аутентификация на основе JWT-токенов</li>
          <li>Двухфакторная аутентификация с помощью TOTP-кодов</li>
          <li>Ролевая система доступа: врач, пациент</li>
          <li>Шифрование медицинских данных</li>
          <li>Хэширование паролей</li>
          <li>Верификация почты</li>
          <li>
            Защита от инъекционных и межсайтовых атак: SQL-инъекций, XSS- и
            CSRF-атак
          </li>
        </ul>
        <div className="text-lg font-semibold">Технологический стэк:</div>
        <div>
          React, NextJS, TypeScript, JavaScript, NestJS, PostgreSQL, PrismaORM,
          Argon2, AES, ShadCN, Tailwind, NodeJS, VScode, npm, TunStack Query,
          Axios, Cookie, TOTP, OTP и др.
        </div>
      </Container>
    </section>
  );
};
