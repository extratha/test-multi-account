import useTranslation from "@/locales/useLocale";
import * as yup from "yup";

// TODO: unit test
const useRequiredConsentSchema = () => {
  const { translation } = useTranslation();

  return yup.object().shape({
    agreement: yup
      .boolean()
      .required(translation("Common.validation.require"))
      .test("agreement", translation("Common.validation.require"), (value) => {
        return value;
      }),
  });
};

export default useRequiredConsentSchema;
