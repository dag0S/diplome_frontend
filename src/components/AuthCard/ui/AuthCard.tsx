import type { FC, ReactNode } from "react";

import { cn } from "@/src/shared/lib";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/shared/shadcn/ui/card";

interface Props {
  className?: string;
  children: ReactNode;
  title: string;
  description?: ReactNode;
}

export const AuthCard: FC<Props> = ({
  className,
  children,
  title,
  description,
}) => {
  return (
    <Card className={cn("w-sm", className)}>
      <CardHeader className="gap-4">
        <CardTitle className="text-xl text-center">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
