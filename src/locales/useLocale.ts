import { useTranslation as useI18nTranslation } from "next-i18next";

const useTranslation = () => {
  const { t } = useI18nTranslation();

  return {
    translation: t,
  };
};

export default useTranslation;
