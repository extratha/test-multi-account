import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { LOCALE_LANGUAGE, LOCALE_NAMESPACE } from "@/config/i18n";
import { LocaleResource } from "@/types/model.ui";

export const initI18next = (lang: string, resource: LocaleResource) => {
  i18n.use(initReactI18next).init({
    lng: LOCALE_LANGUAGE.TH,
    fallbackLng: LOCALE_LANGUAGE.TH,
    ns: [LOCALE_NAMESPACE],
    defaultNS: LOCALE_NAMESPACE,
    partialBundledLanguages: false,
    resources: {
      [lang]: { [LOCALE_NAMESPACE]: resource },
    },
  });

  return i18n;
};
