// TODO: refactor
/* eslint-disable jest/no-identical-title */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/no-unnecessary-act */

import ToastSnackBar from "@/components/Toast";
import useToastStore from "@/store/useToastStore";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";

jest.mock("../../../store/useToastStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));
describe("ToastSnackBar component", () => {
  const setToastOpenMock = jest.fn();
  beforeEach(() => {
    (useToastStore as any).mockReturnValue({
      open: true,
      description: {
        message: "Test message",
        severity: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        icon: null,
      },
      setToastOpen: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders with default message and severity when description is not provided", () => {
    (useToastStore as any).mockReturnValue({
      open: true,
      description: { message: "" },
      setToastOpen: jest.fn(),
    });

    render(<ToastSnackBar />);

    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-standardSuccess");
  });

  it("renders with the correct message and severity", () => {
    render(<ToastSnackBar />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-standardSuccess");
  });

  it("calls setToastOpen when handleClose is called", () => {
    render(<ToastSnackBar />);
    fireEvent.click(screen.getByRole("button"));
    expect(useToastStore().setToastOpen).toHaveBeenCalledWith(false);
  });

  it("renders with the correct default anchor origin", async () => {
    await act(async () => render(<ToastSnackBar />));
  });

  it("renders with the open false", async () => {
    (useToastStore as any).mockReturnValue({
      open: true,
      description: {
        message: "Test message",
        severity: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        icon: null,
      },
      setToastOpen: jest.fn(),
    });
    await act(async () => render(<ToastSnackBar />));

    fireEvent.click(screen.getByRole("button"));
  });

  it("calls onClose when Snackbar is closed due to clickaway", async () => {
    await render(
      <div data-testid="wrapper">
        <span data-testid="placeholder-element">Placeholder Element</span>
        <ToastSnackBar />
      </div>
    );
    fireEvent.click(screen.getByRole("button"));
    const someText = screen.getByTestId("placeholder-element");
    const wrapper = screen.getByTestId("wrapper");
    await waitFor(async () => {
      fireEvent.click(someText);
    });

    await waitFor(() => {
      fireEvent.click(wrapper);
    });
  });

  it("renders with the provided anchor origin", () => {
    (useToastStore as any).mockReturnValueOnce({
      ...useToastStore(),
      description: {
        ...useToastStore().description,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      },
    });
    render(<ToastSnackBar />);
    fireEvent.click(screen.getByRole("button"));
  });

  it("renders ToastSnackBar with default anchorOrigin", () => {
    (useToastStore as any).mockReturnValueOnce({
      open: true,
      description: {
        message: "Test message",
        severity: "success",
        icon: null,
      },
      setToastOpen: setToastOpenMock,
    });

    render(<ToastSnackBar />);
  });

  it("renders ToastSnackBar with default severity and icon", () => {
    (useToastStore as any).mockReturnValueOnce({
      open: true,
      description: {
        message: "Test message",
        anchorOrigin: {
          vertical: "top",
          horizontal: "left",
        },
      },
      setToastOpen: setToastOpenMock,
    });

    render(<ToastSnackBar />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    // TODO: expect class
    // expect(screen.getByRole("alert")).toHaveClass("MuiAlert-colorSuccess");
    expect(screen.queryByTestId("close-icon")).not.toBeInTheDocument();
  });

  it("renders with the correct message and severity when open is true", () => {
    (useToastStore as any).mockReturnValueOnce({
      open: true,
      description: {
        message: "Test message",
        severity: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        AlertProps: {}, // Add other necessary props here
      },
      setToastOpen: jest.fn(),
    });

    render(<ToastSnackBar />);

    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("MuiAlert-standardSuccess");
  });

  it("does not render when open is false", () => {
    (useToastStore as any).mockReturnValueOnce({
      open: false,
      description: {
        message: "Test message",
        severity: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        AlertProps: {}, // Add other necessary props here
      },
      setToastOpen: jest.fn(),
    });

    render(<ToastSnackBar />);
  });
});
