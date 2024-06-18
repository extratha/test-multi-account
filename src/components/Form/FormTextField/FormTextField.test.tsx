import MockForm, { MockFormProps } from "@/__tests__/__mocks__/MockForm";
import * as yup from "yup";
import FormTextField, { FormTextFieldProps } from ".";
import { flushPromise, render, screen, userEvent } from "../../../__tests__/testUtils";

// TODO: Refactor
describe("FormTextField", () => {
  const props: FormTextFieldProps = {
    name: "test",
    label: "Test",
  };
  const error = {
    message: {
      require: "this field is require",
      maxLength: "error max length",
    },
  };

  let form: MockFormProps;

  let fieldSchema = yup.string();
  const renderComponent = async (props: FormTextFieldProps) => {
    if (props.required) {
      fieldSchema = fieldSchema.required(error.message.require);
    }
    if (props.maxLength) {
      fieldSchema = fieldSchema.max(Number(props.maxLength), error.message.maxLength);
    }
    form = {
      initValues: { test: "" },
      resolver: yup.object({ test: fieldSchema }),
      onSubmit: jest.fn(),
    };
    const view = render(
      <MockForm {...form}>
        <FormTextField {...props} />
      </MockForm>
    );
    await flushPromise();
    return view;
  };

  it("should render correctly", async () => {
    const { asFragment } = await renderComponent(props);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display correctly", async () => {
    await renderComponent(props);
    expect(screen.getByTestId("input-text-test")).toBeInTheDocument();
  });

  it("should not show error after submit valid value", async () => {
    await renderComponent(props);
    const textField = screen.getByTestId("input-text-test");

    await userEvent.type(textField, "20");
    await userEvent.click(screen.getByTestId("submit-button"));
    expect(screen.queryByTestId("error-field-test")).toBeNull();
  });

  it("should display require error", async () => {
    props.required = true;
    await renderComponent(props);
    const textField = screen.getByTestId("input-text-test");

    await userEvent.type(textField, "1");
    await userEvent.clear(textField);
    await userEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByText(error.message.require)).toBeInTheDocument();
  });

  it("should display maxLength error", async () => {
    props.maxLength = 5;
    await renderComponent(props);
    const textField = screen.getByTestId("input-text-test");

    await userEvent.type(textField, "123456789");
    await userEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByText(error.message.maxLength)).toBeInTheDocument();
  });
});
