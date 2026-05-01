import type { FC, ReactNode } from "react";

import { cn } from "@/src/shared/lib";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/shared/shadcn/ui/card";

interface Props {
  className?: string;
  children: ReactNode;
  title: string;
}

export const AuthCard: FC<Props> = ({ className, children, title }) => {
  return (
    <Card className={cn("w-sm", className)}>
      <CardHeader>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
