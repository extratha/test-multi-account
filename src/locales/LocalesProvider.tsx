"use client";

import { ReactNode, useState } from "react";
import { I18nextProvider } from "react-i18next";

import { initI18next } from "./i18n";
import { LocaleResource } from "@/types/model.ui";

export interface LocalesProviderProps {
  lang: string;
  resource: LocaleResource;
  children: ReactNode;
}

const LocalesProvider = (props: LocalesProviderProps) => {
  const { lang, resource, children } = props;
  const [i18n] = useState(initI18next(lang, resource));

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default LocalesProvider;
