import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as yup from "yup";

import MockForm from "@/__mocks__/MockForm";
import FormCheckbox, { FormCheckboxProps } from "@/components/Form/FormCheckbox";
import { render } from "@/testUtils/testUtils";

describe("FormCheckbox", () => {
  let props: FormCheckboxProps;
  let form: any;

  beforeEach(() => {
    props = {
      name: "test",
      label: "test label",
    };

    form = {
      initValues: { test: false },
      resolver: yup.object().shape({
        test: yup.boolean().required("Message Error"),
      }),
      onSubmit: jest.fn(),
    };
  });

  const renderComponent = () => {
    return render(
      <MockForm {...form}>
        <FormCheckbox {...props} />
      </MockForm>
    );
  };

  it("should render correctly", () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should check/uncheck when click checkbox", async () => {
    renderComponent();

    expect(screen.getByTestId("test-checkbox-value")).not.toBeChecked();

    await userEvent.click(screen.getByTestId("test-checkbox"));
    expect(screen.getByTestId("test-checkbox-value")).toBeChecked();

    await userEvent.click(screen.getByTestId("test-checkbox"));
    expect(screen.getByTestId("test-checkbox-value")).not.toBeChecked();
  });
});
