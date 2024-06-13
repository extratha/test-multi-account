import { FieldConfig } from "@/types/interpretInputDataConfig";
import * as Yup from "yup";

export const inputDataFieldYupSchema = (fieldConfig: FieldConfig) => {
  const shape: Record<string, Yup.AnySchema> = {};

  fieldConfig.forEach((group) => {
    group.data.forEach((field) => {
      let schema: Yup.AnySchema = Yup.string();

      switch (field.fieldType) {
        case "Number":
          schema = Yup.number();
          if (field.required) {
            schema = schema.required("This field is required");
          }
          if (field.minLength) {
            schema = (schema as Yup.NumberSchema).min(Number(field.minLength), `Minimum value is ${field.minLength}`);
          }
          if (field.maxLength) {
            schema = (schema as Yup.NumberSchema).max(Number(field.maxLength), `Maximum value is ${field.maxLength}`);
          }
          break;
        case "Dropdown":
          schema = Yup.string();
          if (field.required) {
            schema = schema.required("This field is required");
          }
          if (field.dropdownValue) {
            schema = schema.oneOf(field.dropdownValue, `Invalid value`);
          }
          break;
        default:
          schema = Yup.string();
          if (field.required) {
            schema = schema.required("This field is required");
          }
          if (field.minLength) {
            schema = (schema as Yup.StringSchema).min(Number(field.minLength), `Minimum length is ${field.minLength}`);
          }
          if (field.maxLength) {
            schema = (schema as Yup.StringSchema).max(Number(field.maxLength), `Maximum length is ${field.maxLength}`);
          }
          break;
      }

      shape[field.key] = schema;
    });
  });

  return Yup.object().shape(shape);
};
