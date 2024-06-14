import MockForm, { MockFormProps } from "@/__tests__/__mocks__/MockForm";
import * as yup from "yup";
import FormNumberInput, { FormNumberInputProps } from ".";
import { flushPromise, render, screen, userEvent } from "../../../__tests__/testUtils";
describe("FormNumberInput", () => {
  let props: FormNumberInputProps = {
    name: "test",
    label: "Test",
  };
  let form: MockFormProps;
  const error = {
    message: {
      require: "this field is require",
      min: "min error",
      max: "max error",
      invalidType: "invalid type",
    },
  };
  let fieldSchema = yup.number();
  beforeEach(() => {});
  const renderComponent = async (props: FormNumberInputProps) => {
    fieldSchema = fieldSchema.typeError(error.message.invalidType);
    if (props.required) {
      fieldSchema = fieldSchema
        .transform((value) => (isNaN(value) ? undefined : value))
        .required(error.message.require);
    }
    if (props.min) {
      fieldSchema = fieldSchema.min(Number(props.min), error.message.min);
    }
    if (props.max) {
      fieldSchema = fieldSchema.max(Number(props.max), error.message.max);
    }
    form = {
      initValues: { test: "" },
      resolver: yup.object({ test: fieldSchema }),
      onSubmit: jest.fn(),
    };
    const view = render(
      <MockForm {...form}>
        <FormNumberInput {...props} />
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
    expect(screen.getByTestId("input-number-test")).toBeInTheDocument();
  });
  it("should not show error after submit valid value", async () => {
    await renderComponent(props);
    const textField = screen.getByTestId("input-number-test");

    await userEvent.type(textField, "20");
    await userEvent.click(screen.getByTestId("submit-button"));
    expect(screen.queryByTestId("error-field-test")).toBeNull();
  });
  it("should display require error", async () => {
    props.required = true;
    await renderComponent(props);
    const textField = screen.getByTestId("input-number-test");

    await userEvent.type(textField, "1");
    await userEvent.clear(textField);
    await userEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByText(error.message.require)).toBeInTheDocument();
  });
  it("should display min error", async () => {
    props.min = 10;
    await renderComponent(props);
    const textField = screen.getByTestId("input-number-test");

    await userEvent.type(textField, "5");
    await userEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByText(error.message.min)).toBeInTheDocument();
  });
  it("should display max error", async () => {
    props.max = 30;
    await renderComponent(props);
    const textField = screen.getByTestId("input-number-test");

    await userEvent.type(textField, "50");
    await userEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByText(error.message.max)).toBeInTheDocument();
  });
  it("should with decimal", async () => {
    props.decimalScale = 2;
    await renderComponent(props);
    const textField = screen.getByTestId("input-number-test");

    await userEvent.type(textField, "50.01");
    await userEvent.click(screen.getByTestId("submit-button"));
    expect(screen.queryByTestId(error.message.max)).toBeNull();
  });
  // it("no optional props", async () => {
  //   props = { name: "test", label: "Test" };
  //   console.log(props);
  //   await renderComponent(props);
  //   const textField = screen.getByTestId("input-number-test");

  //   await userEvent.type(textField, "0");
  //   await userEvent.click(screen.getByTestId("submit-button"));
  //   expect(screen.queryByTestId("error-field-test")).toBeNull();
  // });
});
