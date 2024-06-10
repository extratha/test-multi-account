import { mockLoginResponse } from "@/__tests__/__mocks__/data";
import LoginForm from "@/modules/LoginModule/LoginForm";
import axiosPublicInstance from "@/utils/axios/login";
import { render, screen, userEvent, waitFor } from "../../../testUtils";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));

jest.mock("../../../../utils/axios/login", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

describe("LoginForm Component", () => {
  it("to match snap", async () => {
    const { asFragment } = render(<LoginForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the login form with email and password fields", async () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText("อีเมล")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("รหัสผ่าน")).toBeInTheDocument();
    expect(screen.getByTestId("button-login")).toBeDisabled();
  });

  it("shows validation messages on email and password fields", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("อีเมล");
    const passwordInput = screen.getByPlaceholderText("รหัสผ่าน");

    await userEvent.type(emailInput, "invalid-email");
    await userEvent.type(passwordInput, "123");
    expect(await screen.findByText(/อีเมลไม่ถูกต้อง/)).toBeInTheDocument();
    expect(await screen.findByText(/รหัสผ่านต้องมีอย่างน้อย 8 หลัก/)).toBeInTheDocument();
  });

  it("enables submit button when both fields are valid", async () => {
    render(<LoginForm />);

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
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText("อีเมล");
    const passwordInput = screen.getByPlaceholderText("รหัสผ่าน");
    const submitButton = screen.getByTestId("button-login");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "Test@passw0rd");

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Cariva Playground")).toBeInTheDocument();
    });
  });

  it("switch field password to type text.", async () => {
    render(<LoginForm />);

    const buttonToggleShowPassword = screen.getByTestId("button-toggle-show-password");
    const passwordInput = screen.getByPlaceholderText("รหัสผ่าน");

    await userEvent.click(buttonToggleShowPassword);

    expect(passwordInput).toHaveAttribute("type", "text");
  });
  it('redirects to forget password page when "Forget Password" link is clicked', async () => {
    render(<LoginForm />);

    const forgetPasswordLink = screen.getByText("ลืมรหัสผ่าน");
    expect(forgetPasswordLink).toBeInTheDocument();

    await userEvent.click(forgetPasswordLink);
  });

  // TODO: rename test case
  // eslint-disable-next-line jest/no-identical-title
  it("submits the form with valid inputs", async () => {
    const responseData = mockLoginResponse;
    (axiosPublicInstance.post as jest.Mock).mockResolvedValueOnce({ data: responseData });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("อีเมล");
    const passwordInput = screen.getByPlaceholderText("รหัสผ่าน");
    const submitButton = screen.getByTestId("button-login");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "Test@passw0rd");
    await userEvent.click(submitButton);

    expect(screen.getByText("Cariva Playground")).toBeInTheDocument();
  });

  it("submits the form with valid inputs with password changed false", async () => {
    const responseData = mockLoginResponse;
    responseData.user.passwordChanged = false;
    (axiosPublicInstance.post as jest.Mock).mockResolvedValueOnce({ data: responseData });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("อีเมล");
    const passwordInput = screen.getByPlaceholderText("รหัสผ่าน");
    const submitButton = screen.getByTestId("button-login");

    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "Test@passw0rd");
    await userEvent.click(submitButton);

    expect(screen.getByText("Cariva Playground")).toBeInTheDocument();
  });
});
