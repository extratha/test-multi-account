import { render, screen, userEvent } from '../../../testUtils';
import SetNewPasswordForm from '@/modules/SetNewPasswordModule/SetNewPasswordForm';
import axiosInstance, { AxiosInstance } from "@/utils/axios";
import axiosPublicInstance from "@/utils/axios/login";
import { API } from "@/constant/api";
import { webPaths } from "@/constant/webPaths";
import { setCookie, deleteCookie } from 'cookies-next';

jest.mock('axios');
jest.mock('cookies-next');
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));
jest.mock("../../../../store", () => ({
  usePageLoadingStore: () => ({ setPageLoading: jest.fn() }),
  useUserProfileStore: () => ({ data: { passwordChanged: false } }),
  useToastStore: () => ({ setToastOpen: jest.fn() }),
}));

describe('SetNewPasswordForm', () => {
  const setup = () => render(<SetNewPasswordForm />);

  it('renders the form correctly', () => {
    setup();
    expect(screen.getByText(/ตั้งค่ารหัสผ่านใหม่/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ตั้งค่ารหัสผ่าน')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ตั้งรหัสผ่านใหม่อีกครั้ง')).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    setup();
    const toggleButtons = screen.getAllByRole('button', { name: /toggle show password/i });
    expect(toggleButtons).toHaveLength(2);

    userEvent.click(toggleButtons[0]);
    expect(screen.getByLabelText('Showing password')).toBeInTheDocument();

    userEvent.click(toggleButtons[0]);
    expect(screen.getByLabelText('Hiding password')).toBeInTheDocument();
  });

  it('shows validation error for empty fields', async () => {
    setup();
    userEvent.click(screen.getByRole('button', { name: /setNewPassword/i }));

    expect(await screen.findAllByText('validation.require')).toHaveLength(2);
  });

  it('shows validation error for invalid password format', async () => {
    setup();
    const newPasswordField = screen.getByPlaceholderText('ตั้งค่ารหัสผ่าน');
    userEvent.type(newPasswordField, 'invalidpassword');

    userEvent.click(screen.getByRole('button', { name: /setNewPassword/i }));

    expect(await screen.findByText('validation.invalidPasswordFormat')).toBeInTheDocument();
  });

  it('shows validation error for password mismatch', async () => {
    setup();
    const newPasswordField = screen.getByPlaceholderText('ตั้งค่ารหัสผ่าน');
    const confirmNewPasswordField = screen.getByPlaceholderText('ตั้งรหัสผ่านใหม่อีกครั้ง');

    userEvent.type(newPasswordField, 'ValidPassword1!');
    userEvent.type(confirmNewPasswordField, 'DifferentPassword1!');

    userEvent.click(screen.getByRole('button', { name: /setNewPassword/i }));

    expect(await screen.findByText('validation.passwordIsNotMatch')).toBeInTheDocument();
  });

  it('submits the form successfully with valid data', async () => {
    setup();
    const setPageLoading = jest.fn();
    const setToastOpen = jest.fn();
    const push = jest.fn();
    jest.mock("@/store", () => ({
      usePageLoadingStore: jest.fn(() => ({ setPageLoading })),
      useToastStore: jest.fn(() => ({ setToastOpen })),
    }));
    jest.mock('next/navigation', () => ({
      useRouter: () => ({ push }),
    }));
    const newPasswordField = screen.getByPlaceholderText('ตั้งค่ารหัสผ่าน');
    const confirmNewPasswordField = screen.getByPlaceholderText('ตั้งรหัสผ่านใหม่อีกครั้ง');

    userEvent.type(newPasswordField, 'ValidPassword1!');
    userEvent.type(confirmNewPasswordField, 'ValidPassword1!');

    userEvent.click(screen.getByRole('button', { name: /setNewPassword/i }));

    // Mock API response
    (axiosPublicInstance.post as jest.Mock).mockResolvedValueOnce({ status: 204 });

    expect(setPageLoading).toHaveBeenCalledWith(true);
    await screen.findByText('toast.resetPasswordSuccess');
    expect(deleteCookie).toHaveBeenCalledWith('resetPasswordToken');
    expect(setCookie).toHaveBeenCalledWith('passwordChanged', true);
  });

  it('handles API error response', async () => {
    setup();

    const setPageLoading = jest.fn();
    const setToastOpen = jest.fn();
    const push = jest.fn();
    jest.mock("@/store", () => ({
      usePageLoadingStore: jest.fn(() => ({ setPageLoading })),
      useToastStore: jest.fn(() => ({ setToastOpen })),
    }));
    jest.mock('next/navigation', () => ({
      useRouter: () => ({ push }),
    }));
    const newPasswordField = screen.getByPlaceholderText('ตั้งค่ารหัสผ่าน');
    const confirmNewPasswordField = screen.getByPlaceholderText('ตั้งรหัสผ่านใหม่อีกครั้ง');

    userEvent.type(newPasswordField, 'ValidPassword1!');
    userEvent.type(confirmNewPasswordField, 'ValidPassword1!');

    userEvent.click(screen.getByRole('button', { name: /setNewPassword/i }));

    // Mock API error response
    (axiosPublicInstance.post as jest.Mock).mockRejectedValueOnce({ message: 'Error occurred' });

    expect(setPageLoading).toHaveBeenCalledWith(true);
    expect(await screen.findByText('Error occurred')).toBeInTheDocument();
    expect(setPageLoading).toHaveBeenCalledWith(false);
  });
});