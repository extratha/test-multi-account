import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as yup from "yup";

import MockForm, { MockFormProps } from "@/__mocks__/MockForm";
import { render } from "@/testUtils/testUtils";
import FormTextInput, { FormTextInputProps } from ".";

describe("FormTextInput", () => {
  let form: MockFormProps;
  let props: FormTextInputProps;

  const errorMessage = "Error Message";

  beforeEach(() => {
    props = {
      name: "test",
      required: true,
    };

    form = {
      initValues: { test: "" },
      resolver: yup.object({ test: yup.string().required(errorMessage) }),
      onSubmit: jest.fn(),
    };
  });

  const renderFormTextInput = () => {
    return render(
      <MockForm {...form}>
        <FormTextInput {...props} />
      </MockForm>
    );
  };

  it("should render correctly", () => {
    const { asFragment } = renderFormTextInput();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should show/hide error correctly", async () => {
    renderFormTextInput();

    await userEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByTestId("error-field-test")).toHaveTextContent(errorMessage);

    await userEvent.type(screen.getByTestId("input-text-test"), "Input Text");
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("input-text-test")).toHaveDisplayValue("Input Text");
    expect(screen.queryByTestId("error-field-test")).not.toBeInTheDocument();
  });
});
