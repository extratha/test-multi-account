import { FieldValuesForSubmit, LabInfoData } from "@/types/model.api";
import { InputGroupConfigResult } from "@/types/model.ui";

const convertValueToString = (value: unknown) => {
  return typeof value === "number" ? String(value) : value;
};

// TODO: unit test
export const mapInputDataToSubmitInterprets = (
  formValues: Record<string, unknown>,
  configs: InputGroupConfigResult[]
) => {
  const labInfo: LabInfoData[] = [];

  configs.forEach(({ groupName, data }) => {
    const dataValue: FieldValuesForSubmit[] = [];

    data.forEach((value) => {
      if (formValues[value.key]) {
        dataValue.push({
          key: value.key,
          value: convertValueToString(formValues[value.key]),
          unit: value.unit,
          range: value.range,
        });
      }
    });

    if (dataValue.length > 0) {
      labInfo.push({ groupName, data: dataValue });
    }
  });

  return { labInfo };
};
