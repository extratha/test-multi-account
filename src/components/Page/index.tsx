import { ReactNode } from "react";

export interface PageProps {
  meta?: ReactNode;
  title?: string;
  children?: ReactNode;
}

export const Page = ({ children, title, meta }: PageProps) => (
  <>
    {title && <title>{title}</title>}
    {meta}
    {children}
  </>
);
