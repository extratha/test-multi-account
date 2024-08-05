import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { INTERPRET_STATUS } from "@/constant";
import { render } from "@/testUtils/testUtils";
import InterpretModal, { InterpretModalProps } from "./InterpretModal";

describe("InterpretModal", () => {
  let props: InterpretModalProps;

  beforeEach(() => {
    props = {
      status: INTERPRET_STATUS.PENDING,
      onClose: jest.fn(),
    };
  });

  const renderInterpretModal = () => {
    return render(<InterpretModal {...props} />);
  };

  it("should render correctly", () => {
    const { baseElement } = renderInterpretModal();
    expect(baseElement).toMatchSnapshot();
  });

  it("should display InterpretingModals with status failed", async () => {
    props.status = INTERPRET_STATUS.FAILED;
    renderInterpretModal();

    expect(screen.getByTestId("interpret-image-failed")).toBeInTheDocument();
  });

  it("should call closeModal prop when click retry button", async () => {
    props.status = INTERPRET_STATUS.PENDING;
    renderInterpretModal();

    await userEvent.click(screen.getByTestId("modal-ok-button"));

    expect(props.onClose).toHaveBeenCalled();

    props.status = INTERPRET_STATUS.FAILED;
    renderInterpretModal();

    await userEvent.click(screen.getByTestId("modal-retry-button"));

    expect(props.onClose).toHaveBeenCalled();
  });
});
