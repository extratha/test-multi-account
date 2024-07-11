import { useMemo } from "react";
import * as Yup from "yup";

import { InputGroupConfig } from "@/types/model.ui";
import useTranslation from "@/locales/useLocale";

export const useInputDataFieldYupSchema = (config: InputGroupConfig[]) => {
  const { translation } = useTranslation();

  const fieldConfig = useMemo(() => {
    const shape: Record<string, Yup.AnySchema> = {};

    config.forEach((group) => {
      group.data.forEach((field) => {
        let schema: Yup.AnySchema;

        const error = {
          message: {
            require: translation("Common.validation.require"),
            selectRequire: translation("Common.validation.selectRequire"),
            range: `${translation("Common.validation.valueMustBeInRange")} ${field.minValue}-${
              field.maxValue
            } ${translation("Common.validation.only")}`,
            invalidInput: translation("Common.validation.invalidInput"),
            length: `${translation("Common.validation.valueMustNotExceed")} ${field.maxLength} ${translation(
              "Common.validation.characters"
            )} `,
          },
        };
        switch (field.fieldType) {
          case "Number":
            schema = Yup.number()
              .typeError(error.message.invalidInput)
              .transform((value, originalValue) => (originalValue === "" ? undefined : value));

            if (field.required) {
              schema = schema.required(error.message.require);
            }
            if (field.minValue) {
              schema = (schema as Yup.NumberSchema).min(Number(field.minValue), error.message.range);
            }
            if (field.maxValue) {
              schema = (schema as Yup.NumberSchema).max(Number(field.maxValue), error.message.range);
            }
            break;
          case "Dropdown":
            schema = Yup.string().nullable();
            if (field.required) {
              schema = schema.required(error.message.selectRequire);
            }
            if (field.dropdownValue) {
              schema = schema.oneOf(field.dropdownValue, error.message.invalidInput);
            }
            break;
          default:
            schema = Yup.string();
            if (field.required) {
              schema = schema.required(error.message.require);
            }
            if (field.maxLength) {
              schema = (schema as Yup.StringSchema).max(Number(field.maxLength), error.message.length);
            }
            break;
        }

        shape[field.key] = schema;
      });
    });

    return Yup.object().shape(shape);
  }, [config.length]);

  return fieldConfig;
};
