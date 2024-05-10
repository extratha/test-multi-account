import { BoxProps } from "@mui/material";
import { ReactNode } from "react";

export type PageProps = {
  meta?: ReactNode;
  title?: string;
} & BoxProps;

export const Page = ({ children, title, meta }: PageProps) => (
  <>
    {title && <title>{title}</title>}
    {meta}
    {children}
  </>
);
