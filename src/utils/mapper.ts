import { SubmitLabInterpretsRequest } from "@/types/model.api";
import { InputGroupConfigResult } from "@/types/model.ui";

const convertValueToString = (value: unknown) => {
  return typeof value === "number" ? String(value) : value;
};

// TODO: unit test
export const mapInputDataToSubmitInterprets = (
  formValues: Record<string, unknown>,
  configs: InputGroupConfigResult[]
) => {
  const data: SubmitLabInterpretsRequest = {
    labInfo: configs
      .filter((group) => (group.data && group.data.some((data) => formValues[data.key])))
      .map((group) => ({
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
