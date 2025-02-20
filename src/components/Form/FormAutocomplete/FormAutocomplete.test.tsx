import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as yup from "yup";

import MockForm, { MockFormProps } from "@/__mocks__/MockForm";
import { flushPromise, render } from "@/testUtils/testUtils";
import FormAutocomplete, { FormAutocompleteProps } from ".";

describe("FormAutocomplete", () => {
  const props: FormAutocompleteProps = {
    name: "test",
    label: "Test",
    options: [
      {
        label: "test1",
        value: "Test1",
      },
      {
        label: "test2",
        value: "Test2",
      },
    ],
  };
  let form: MockFormProps;
  const error = {
    message: {
      require: "this field is require",
      invalid: "invalid value",
    },
  };
  let fieldSchema = yup.string().nullable();
  const renderComponent = async (props: FormAutocompleteProps) => {
    if (props.required) {
      fieldSchema = fieldSchema.required(error.message.require);
    }
    if (props.options) {
      fieldSchema = fieldSchema.oneOf(
        props.options.map((value) => value.value),
        error.message.invalid
      );
    }
    form = {
      initValues: { test: "" },
      resolver: yup.object({ test: fieldSchema }),
      onSubmit: jest.fn(),
    };
    const view = render(
      <MockForm {...form}>
        <FormAutocomplete {...props} />
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
    expect(screen.getByTestId("autocomplete-test")).toBeInTheDocument();
  });
  it("should set value when select", async () => {
    await renderComponent(props);
    const autocomplete = screen.getByRole("combobox");
    fireEvent.click(autocomplete);
    fireEvent.change(autocomplete, { target: { value: "test1" } });
    expect(autocomplete).toHaveValue("test1");
  });

  it("should has empty text when try to input value not in options", async () => {
    await renderComponent(props);

    const autocomplete = screen.getByRole("combobox");
    fireEvent.focus(autocomplete);
    fireEvent.change(autocomplete, { target: { value: "xxxx" } });
    const dropdown = screen.getByText(/ไม่พบข้อมูล/i);
    expect(dropdown).toBeInTheDocument();
  });

  it("should display options correctly", async () => {
    await renderComponent(props);

    const autoComplete = screen.getByRole("combobox");
    await userEvent.click(autoComplete);

    expect(screen.getByText("test1")).toBeInTheDocument();
    expect(screen.getByText("test2")).toBeInTheDocument();
  });
  it("should clear value", async () => {
    await renderComponent(props);
    const autocomplete = screen.getByRole("combobox");

    fireEvent.click(autocomplete);
    fireEvent.change(autocomplete, { target: { value: "test1" } });

    await userEvent.clear(autocomplete);

    expect(autocomplete).toHaveValue("");
  });

  it("should render with no options", async () => {
    props.options = undefined;
    await renderComponent(props);

    const autocomplete = screen.getByRole("combobox");

    expect(autocomplete).toBeInTheDocument();
  });
});
