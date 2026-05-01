import type { FC } from "react";

import { cn } from "@/src/shared/lib";

interface Props {
  className?: string;
}

export const Footer: FC<Props> = ({ className }) => {
  return (
    <footer className={cn("py-2 flex justify-center", className)}>
      <div className="text-center text-sm text-muted-foreground max-w-[400px]">
        Дипломный проект модели информационной безопасности для
        информационно-технологической системы «Докт24»
      </div>
    </footer>
  );
};
