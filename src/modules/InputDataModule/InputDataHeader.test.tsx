import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { spyUseSearchParams, SpyUseSearchParams } from "@/testUtils/navigation";
import { render } from "@/testUtils/testUtils";
import InputDataHeaderSection, { InputDataHeaderProps } from "./InputDataHeader";

describe("InputDataHeaderSection", () => {
  let props: InputDataHeaderProps;
  let spySearchParams: SpyUseSearchParams;

  const mockTransactionID = "labId";

  beforeEach(() => {
    spySearchParams = spyUseSearchParams();

    spySearchParams.get.mockImplementation((key: string) => {
      if (key === "exampleId") return undefined;
    });

    props = {
      isDisableSubmit: false,
      modelVersion: "1.0",
      onSubmit: jest.fn(),
      onClickUseExampleData: jest.fn(),
    };
  });

  const renderInputDataHeaderSection = () => {
    return render(<InputDataHeaderSection {...props} />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderInputDataHeaderSection();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should disabled submit interpret button when isDisableSubmit prop is true", async () => {
    props.isDisableSubmit = true;
    renderInputDataHeaderSection();

    expect(screen.getByTestId("submit-interpret-button")).toBeDisabled();
  });

  it("should call onSubmit prop when click submit interpret button", async () => {
    props.isDisableSubmit = false;
    renderInputDataHeaderSection();

    await userEvent.click(screen.getByTestId("submit-interpret-button"));

    expect(props.onSubmit).toHaveBeenCalled();
  });

  it("should call onClickUseExampleData prop when click use example data button", async () => {
    renderInputDataHeaderSection();

    await userEvent.click(screen.getByTestId("use-example-data-button"));

    expect(props.onClickUseExampleData).toHaveBeenCalled();
  });

  it("should not display use example data button when exampleId params is set", () => {
    spySearchParams.get.mockImplementation(() => mockTransactionID);
    renderInputDataHeaderSection();

    expect(screen.queryByTestId("use-example-data-button")).not.toBeInTheDocument();
  });
});
