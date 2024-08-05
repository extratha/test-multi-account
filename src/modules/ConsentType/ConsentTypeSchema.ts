import useTranslation from "@/locales/useLocale";
import * as yup from "yup";

const useSubmitConsentSchema = () => {
  const { translation } = useTranslation();

  return yup.object().shape({
    agreement: yup.boolean().required(translation("Common.validation.require")),
  });
};

export default useSubmitConsentSchema;
