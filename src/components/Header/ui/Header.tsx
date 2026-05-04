"use client";

import { useState, type FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogIn, Menu } from "lucide-react";

import { Container } from "../../Container";
import { Button } from "@/src/shared/shadcn/ui/button";
import { useProfile } from "@/src/hooks/useProfile";
import { Role } from "@/src/types/role.enum";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/shared/shadcn/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/shared/shadcn/ui/sheet";

export const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useProfile();

  return (
    <header className="py-2 shadow-sm bg-background sticky top-0 z-50">
      <Container className="flex justify-between items-center gap-6">
        <Link href="/">
          <Image
            src="/icons/logo.svg"
            width={123}
            height={44}
            alt="Дипломный проект"
            loading="eager"
          />
        </Link>
        <div className="hidden md:flex gap-2">
          <Link href="/">
            <Button variant="ghost">Главная</Button>
          </Link>
          {user ? (
            <>
              <Link href="/consultations">
                <Button variant="ghost">Мои консультации</Button>
              </Link>
              {user.role === Role.DOCTOR ? (
                <Link href="/personal-account/doctor">
                  <Button variant="ghost">
                    Личный кабинет
                    <Avatar className="size-6">
                      <AvatarImage src="/doctor.jpg" alt="Врач" />
                      <AvatarFallback>ВР</AvatarFallback>
                    </Avatar>
                  </Button>
                </Link>
              ) : (
                <Link href="/personal-account/patient">
                  <Button variant="ghost">
                    Личный кабинет
                    <Avatar className="size-6">
                      <AvatarImage src="/patient.jpg" alt="Врач" />
                      <AvatarFallback>ПЦ</AvatarFallback>
                    </Avatar>
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <Link href="/login">
              <Button variant="ghost">
                Войти <LogIn />
              </Button>
            </Link>
          )}
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="flex md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Меню</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 px-2">
              <Link href="/" onClick={() => setIsOpen(false)}>
                <Button variant="ghost">Главная</Button>
              </Link>
              {user ? (
                <>
                  <Link href="/consultations" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost">Мои консультации</Button>
                  </Link>
                  {user.role === Role.DOCTOR ? (
                    <Link
                      href="/personal-account/doctor"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button variant="ghost">
                        Личный кабинет
                        <Avatar className="size-6">
                          <AvatarImage src="/doctor.jpg" alt="Врач" />
                          <AvatarFallback>ВР</AvatarFallback>
                        </Avatar>
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      href="/personal-account/patient"
                      onClick={() => setIsOpen(false)}
                    >
                      <Button variant="ghost">
                        Личный кабинет
                        <Avatar className="size-6">
                          <AvatarImage src="/patient.jpg" alt="Врач" />
                          <AvatarFallback>ПЦ</AvatarFallback>
                        </Avatar>
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost">
                    Войти <LogIn />
                  </Button>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
};
