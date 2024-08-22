import * as yup from "yup";

import useTranslation from "@/locales/useLocale";

// TODO: unit test
const useConsentTypeSchema = () => {
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

export default useConsentTypeSchema;
