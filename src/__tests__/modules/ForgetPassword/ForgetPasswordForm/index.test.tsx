// TODO: refactor
/* eslint-disable testing-library/no-wait-for-multiple-assertions */

import { webPaths } from "@/constant/webPaths";
import ForgetPasswordForm from "@/modules/ForgetPassword/ForgetPasswordForm";
import axiosPublicInstance from "@/utils/axios/login";
import mockRouter from "next-router-mock";
import { fireEvent, render, screen, waitFor } from "../../../testUtils";

jest.mock("../../../../utils/axios/login");

describe("ForgetPasswordForm", () => {
  it("renders the form correctly", async () => {
    render(<ForgetPasswordForm />);

    expect(screen.getByText(/ตั้งค่ารหัสผ่านใหม่/)).toBeInTheDocument();
    expect(screen.getByText(/กรอกอีเมลของคุณเพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/กรอกอีเมลของคุณ/)).toBeInTheDocument();
    expect(screen.getByText(/ส่งคำขอ/)).toBeInTheDocument();
  });

  it("validates email correctly", async () => {
    render(<ForgetPasswordForm />);

    const emailInput = screen.getByPlaceholderText(/กรอกอีเมลของคุณ/);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    await waitFor(() => {
      expect(screen.getByText(/อีเมลไม่ถูกต้อง/)).toBeInTheDocument();
    });
  });

  it("submits the form successfully", async () => {
    (axiosPublicInstance.post as jest.Mock).mockResolvedValue({ status: 204 });

    render(<ForgetPasswordForm />);

    const emailInput = screen.getByPlaceholderText(/กรอกอีเมลของคุณ/);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByTestId("button-submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/ส่งลิงก์ไปยังอีเมลของคุณแล้ว !/)).toBeInTheDocument();
      expect(screen.getByText(/กรุณาตรวจสอบอีเมลของคุณ/)).toBeInTheDocument();
    });
  });

  it("displays error message on failed submission", async () => {
    (axiosPublicInstance.post as jest.Mock).mockRejectedValue({ status: 400, message: "Error occurred" });

    render(<ForgetPasswordForm />);

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

    render(<ForgetPasswordForm />);

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

    render(<ForgetPasswordForm />);

    const emailInput = screen.getByPlaceholderText(/กรอกอีเมลของคุณ/);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByTestId("button-submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/ส่งลิงก์ไปยังอีเมลของคุณแล้ว !/)).toBeInTheDocument();
      expect(screen.getByText(/กรุณาตรวจสอบอีเมลของคุณ/)).toBeInTheDocument();
    });
  });

  it("shows success message and navigates to login on button click", async () => {
    (axiosPublicInstance.post as jest.Mock).mockResolvedValue({ status: 204 });

    render(<ForgetPasswordForm />);

    const emailInput = screen.getByPlaceholderText(/กรอกอีเมลของคุณ/);
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    const submitButton = screen.getByTestId("button-submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/ส่งลิงก์ไปยังอีเมลของคุณแล้ว !/)).toBeInTheDocument();
      expect(screen.getByText(/กรุณาตรวจสอบอีเมลของคุณ/)).toBeInTheDocument();
    });

    const loginButton = screen.getByTestId("button-go-login");
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockRouter.asPath).toEqual(`${webPaths.login}`);
    });
  });
});
