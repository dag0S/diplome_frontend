import type { FC, ReactNode } from "react";

import { cn } from "@/src/shared/lib";

interface Props {
  className?: string;
  children: ReactNode;
}

export const Container: FC<Props> = ({ className, children }) => {
  return (
    <div className={cn("max-w-7xl mx-auto px-2", className)}>{children}</div>
  );
};
