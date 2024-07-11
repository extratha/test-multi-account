import useTranslation from "@/locales/useLocale";
import * as Yup from "yup";

const usePrivacyPolicySchema = () => {
  const { translation } = useTranslation();
  const fieldValidations = {
    agreement: Yup.boolean().required(translation("Common.validation.require")),
  };
  return Yup.object().shape(fieldValidations);
};

export default usePrivacyPolicySchema;
