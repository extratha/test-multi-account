import { SubmitLabInterpretsRequest } from "@/types/model.api";
import { InputGroupConfig } from "@/types/model.ui";

const convertValueToString = (value: unknown) => {
  return typeof value === "number" ? String(value) : value;
};

// TODO: unit test
export const mapInputDataToSubmitInterprets = (formValues: Record<string, unknown>, configs: InputGroupConfig[]) => {
  const data: SubmitLabInterpretsRequest = {
    labInfo: configs.map((group) => ({
      groupName: group.groupName,
      data: group.data.map((data) => ({
        key: data.key,
        value: convertValueToString(formValues[data.key]),
        unit: data.unit,
        range: data.range,
      })),
    })),
  };

  return data;
};
