import { useTranslations } from "next-intl";
import * as Yup from "yup";

const useTermsAndConsSchema = () => {
  const t = useTranslations("Common");
  const validateSchema = Yup.object().shape({
    agreement: Yup.bool().oneOf([true], t("validation.require")).required(),
  });
  return validateSchema;
};

export default useTermsAndConsSchema;
