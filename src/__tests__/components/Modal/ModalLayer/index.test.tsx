import ModalLayer from "@/components/Modal/ModalLayer";
import useModal from "@/store/modal";
import { act, render, renderHook, screen } from "@testing-library/react";

jest.mock("../../../../store/modal", () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      modal: { isVisible: false, content: () => null },
      openModal: jest.fn(),
      closeModal: jest.fn(),
    })),
  };
});

describe("ModalLayer component", () => {
  const closeModalMock = jest.fn();
  const openModalMock = jest.fn();

  beforeEach(() => {
    // jest.clearAllMocks();
  });

  const mockModalContent = () => (
    <div data-testid="modal-content">
      Modal Content
      <button onClick={closeModalMock}>Close</button>
    </div>
  );

  it("renders the modal when visible", () => {
    (useModal as any).mockReturnValue({
      modal: {
        isVisible: true,
        content: mockModalContent,
      },
      closeModal: closeModalMock,
      openModal: openModalMock,
    });
    openModalMock();
    closeModalMock();
    render(<ModalLayer />);
    expect(screen.getByTestId("modal-content")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("opens the modal with the correct content", () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal(mockModalContent);
      result.current.modal.isVisible = true;
    });

    const { asFragment } = render(<ModalLayer />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("closes the modal", async () => {
    const { result } = renderHook(() => useModal());

    act(() => {
      result.current.openModal(mockModalContent);
      result.current.modal.isVisible = false;
    });

    const { asFragment } = render(<ModalLayer />);
    expect(asFragment()).toMatchSnapshot();
  });
});
