import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { mockLoginResponse } from "@/__mocks__/data";
import LoginModule from "@/modules/LoginModule";
import { render } from "@/testUtils/testUtils";
import axiosPublicInstance from "@/utils/axios/login";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock("@/utils/axios/login", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

describe("LoginModule", () => {
  it("to match snap", async () => {
    const { asFragment } = render(<LoginModule />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the login form with email and password fields", async () => {
    render(<LoginModule />);
    expect(screen.getByPlaceholderText("อีเมล")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("รหัสผ่าน")).toBeInTheDocument();
    expect(screen.getByTestId("button-login")).toBeDisabled();
  });

  it("shows validation messages on email and password fields", async () => {
    render(<LoginModule />);

    const emailInput = screen.getByPlaceholderText("อีเมล");
    const passwordInput = screen.getByPlaceholderText("รหัสผ่าน");

    await userEvent.type(emailInput, "invalid-email");
    await userEvent.type(passwordInput, "123");
    expect(await screen.findByText(/อีเมลไม่ถูกต้อง/)).toBeInTheDocument();
    expect(await screen.findByText(/รหัสผ่านต้องมีอย่างน้อย 8 หลัก/)).toBeInTheDocument();
  });

  it("enables submit button when both fields are valid", async () => {
    render(<LoginModule />);

    const emailInput = screen.getByPlaceholderText("อีเมล");
    const passwordInput = screen.getByPlaceholderText("รหัสผ่าน");
    const submitButton = screen.getByTestId("button-login");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "Test@passw0rd");

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it("submits the form with valid inputs", async () => {
    render(<LoginModule />);
    const emailInput = screen.getByPlaceholderText("อีเมล");
    const passwordInput = screen.getByPlaceholderText("รหัสผ่าน");
    const submitButton = screen.getByTestId("button-login");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "Test@passw0rd");

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await userEvent.click(submitButton);

    expect(screen.getByText("CARIVA PLAYGROUND")).toBeInTheDocument();
  });

  it("switch field password to type text", async () => {
    render(<LoginModule />);

    const buttonToggleShowPassword = screen.getByTestId("button-toggle-show-password");
    const passwordInput = screen.getByPlaceholderText("รหัสผ่าน");

    await userEvent.click(buttonToggleShowPassword);

    expect(passwordInput).toHaveAttribute("type", "text");
  });

  it("submits the form with valid inputs with password changed false", async () => {
    const responseData = mockLoginResponse;
    responseData.user.passwordChanged = false;
    (axiosPublicInstance.post as jest.Mock).mockResolvedValueOnce({ data: responseData });

    render(<LoginModule />);

    const emailInput = screen.getByPlaceholderText("อีเมล");
    const passwordInput = screen.getByPlaceholderText("รหัสผ่าน");
    const submitButton = screen.getByTestId("button-login");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "Test@passw0rd");
    await userEvent.click(submitButton);

    expect(screen.getByText("CARIVA PLAYGROUND")).toBeInTheDocument();
  });
});
