"use client";
import { InterpretInputDataProvider } from "@/contexts/InterpretInputDataContext";

import type { ReactNode } from "react";

type AiInterpretLayoutProps = {
  children: ReactNode;
};

export default function AiInterpretLayout({ children }: AiInterpretLayoutProps) {
  return <InterpretInputDataProvider>{children}</InterpretInputDataProvider>;
}
