import useTranslation from "@/locales/useLocale";
import * as Yup from "yup";

const useTermsAndConsSchema = () => {
  const { translation } = useTranslation();

  const validateSchema = Yup.object().shape({
    agreement: Yup.bool().oneOf([true], translation("Common.validation.require")).required(),
  });

  return validateSchema;
};

export default useTermsAndConsSchema;
