import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { INTERPRET_STATUS } from "@/constant/constant";
import { render } from "@/testUtils/testUtils";
import InterpretingModals, { InterpretingModalsProps } from "./InterpretingModals";

describe("InterpretingModals", () => {
  let props: InterpretingModalsProps;

  beforeEach(() => {
    props = {
      interpretStatus: INTERPRET_STATUS.PENDING,
      closeModal: jest.fn(),
    };
  });

  const renderInterpretingModals = () => {
    return render(<InterpretingModals {...props} />);
  };

  it("should render correctly", () => {
    const { asFragment } = renderInterpretingModals();
    expect(asFragment()).toMatchSnapshot();
  });

  it("should display InterpretingModals with status failed", async () => {
    props.interpretStatus = INTERPRET_STATUS.FAILED;
    renderInterpretingModals();

    expect(screen.getByTestId("interpret-image-failed")).toBeInTheDocument();
  });

  it("should call closeModal prop when click retry button", async () => {
    props.interpretStatus = INTERPRET_STATUS.PENDING;
    renderInterpretingModals();

    await userEvent.click(screen.getByTestId("modal-ok-button"));

    expect(props.closeModal).toHaveBeenCalled();

    props.interpretStatus = INTERPRET_STATUS.FAILED;
    renderInterpretingModals();

    await userEvent.click(screen.getByTestId("modal-retry-button"));

    expect(props.closeModal).toHaveBeenCalled();
  });
});
