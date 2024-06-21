import { useTranslations } from "next-intl";
import { useMemo } from "react";
import * as Yup from "yup";

import { InputGroupConfig } from "@/types/interpretInputDataConfig";

export const useInputDataFieldYupSchema = (config: InputGroupConfig[]) => {
  const t = useTranslations("Common");

  const fieldConfig = useMemo(() => {
    const shape: Record<string, Yup.AnySchema> = {};

    config.forEach((group) => {
      group.data.forEach((field) => {
        let schema: Yup.AnySchema;

        const error = {
          message: {
            require: t("validation.require"),
            selectRequire: t("validation.selectRequire"),
            range: `${t("validation.valueMustBeInRange")} ${field.minValue}-${field.maxValue} ${t("validation.only")}`,
            invalidInput: t("validation.invalidInput"),
            length: `${t("validation.valueMustNotExceed")} ${field.maxLength} ${t("validation.characters")} `,
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
