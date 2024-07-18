import { fireEvent, screen, waitFor } from "@testing-library/react";

import { webPaths } from "@/constant/webPaths";
import { spyUseRouter, SpyUseRouter } from "@/testUtils/navigation";
import { render } from "@/testUtils/testUtils";
import axiosPublicInstance from "@/utils/axios/login";
import ForgetPassword from ".";

jest.mock("@/utils/axios/login");

describe("ForgetPassword", () => {
  let spyRouter: SpyUseRouter;

  beforeEach(() => {
    spyRouter = spyUseRouter();
  });

  it("renders the form correctly", async () => {
    render(<ForgetPassword />);

    expect(screen.getByText(/ตั้งค่ารหัสผ่านใหม่/)).toBeInTheDocument();
    expect(screen.getByText(/กรอกอีเมลของคุณเพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/กรอกอีเมลของคุณ/)).toBeInTheDocument();
    expect(screen.getByText(/ส่งคำขอ/)).toBeInTheDocument();
  });

  it("validates email correctly", async () => {
    render(<ForgetPassword />);

    const emailInput = screen.getByPlaceholderText(/กรอกอีเมลของคุณ/);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    await waitFor(() => {
      expect(screen.getByText(/อีเมลไม่ถูกต้อง/)).toBeInTheDocument();
    });
  });

  it("submits the form successfully", async () => {
    (axiosPublicInstance.post as jest.Mock).mockResolvedValue({ status: 204 });

    render(<ForgetPassword />);

    const emailInput = screen.getByPlaceholderText(/กรอกอีเมลของคุณ/);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByTestId("button-submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/ส่งลิงก์ไปยังอีเมลของคุณแล้ว !/)).toBeInTheDocument();
    });

    expect(screen.getByText(/กรุณาตรวจสอบอีเมลของคุณ/)).toBeInTheDocument();
  });

  it("displays error message on failed submission", async () => {
    (axiosPublicInstance.post as jest.Mock).mockRejectedValue({ status: 400, message: "Error occurred" });

    render(<ForgetPassword />);

    const emailInput = screen.getByPlaceholderText(/กรอกอีเมลของคุณ/);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByTestId("button-submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Error occurred")).toBeInTheDocument();
    });
  });
  it("displays error.error on failed submission", async () => {
    (axiosPublicInstance.post as jest.Mock).mockRejectedValue({ status: 400, error: "Error occurred" });

    render(<ForgetPassword />);

    const emailInput = screen.getByPlaceholderText(/กรอกอีเมลของคุณ/);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByTestId("button-submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Error occurred")).toBeInTheDocument();
    });
  });
  it("show success message even got 404 not found user", async () => {
    (axiosPublicInstance.post as jest.Mock).mockRejectedValue({ status: 404, message: "no user found" });

    render(<ForgetPassword />);

    const emailInput = screen.getByPlaceholderText(/กรอกอีเมลของคุณ/);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByTestId("button-submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/ส่งลิงก์ไปยังอีเมลของคุณแล้ว !/)).toBeInTheDocument();
    });

    expect(screen.getByText(/กรุณาตรวจสอบอีเมลของคุณ/)).toBeInTheDocument();
  });

  it("shows success message and navigates to login on button click", async () => {
    (axiosPublicInstance.post as jest.Mock).mockResolvedValue({ status: 204 });

    render(<ForgetPassword />);

    const emailInput = screen.getByPlaceholderText(/กรอกอีเมลของคุณ/);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByTestId("button-submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/ส่งลิงก์ไปยังอีเมลของคุณแล้ว !/)).toBeInTheDocument();
    });

    expect(screen.getByText(/กรุณาตรวจสอบอีเมลของคุณ/)).toBeInTheDocument();

    const loginButton = screen.getByTestId("button-go-login");
    fireEvent.click(loginButton);

    expect(spyRouter.replace).toHaveBeenCalledWith(`${webPaths.login}`);
  });
});
