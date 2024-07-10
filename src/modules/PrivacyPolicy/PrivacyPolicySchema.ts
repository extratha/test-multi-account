import { useTranslations } from "next-intl";
import * as Yup from "yup";

const usePrivacyPolicySchema = () => {
  const t = useTranslations("Common");
  const fieldValidations = {
    agreement: Yup.boolean().required(t('validation.require'))
  }
  return Yup.object().shape(fieldValidations);
};

export default usePrivacyPolicySchema;
