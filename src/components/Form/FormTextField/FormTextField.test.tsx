import MockForm, { MockFormProps } from "@/__tests__/__mocks__/MockForm";
import * as yup from "yup";
import FormTextField, { FormTextFieldProps } from ".";
import { render, screen, userEvent } from "../../../__tests__/testUtils";

describe("FormTextField", () => {
  let form: MockFormProps;
  let props: FormTextFieldProps;

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

  const renderFormTextField = () => {
    return render(
      <MockForm {...form}>
        <FormTextField {...props} />
      </MockForm>
    );
  };

  it("should render correctly", () => {
    const { asFragment } = renderFormTextField();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should show/hide error correctly", async () => {
    renderFormTextField();

    await userEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByTestId("error-field-test")).toHaveTextContent(errorMessage);

    await userEvent.type(screen.getByTestId("input-text-test"), "Input Text");
    await userEvent.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("input-text-test")).toHaveDisplayValue("Input Text");
    expect(screen.queryByTestId("error-field-test")).not.toBeInTheDocument();
  });
});
