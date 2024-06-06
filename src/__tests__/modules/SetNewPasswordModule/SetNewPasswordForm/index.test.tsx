import { fireEvent, act, waitFor, render, screen, userEvent } from '../../../testUtils';
import SetNewPasswordForm from '@/modules/SetNewPasswordModule/SetNewPasswordForm';
import axiosInstance, { AxiosInstance } from "@/utils/axios";
import axiosPublicInstance from "@/utils/axios/login";
import { API } from "@/constant/api";
import { webPaths } from "@/constant/webPaths";
import * as cookiesNext from 'cookies-next';


const setCookie = jest.fn();
const deleteCookie = jest.fn();

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
}));
jest.mock("../../../../store", () => ({
  usePageLoadingStore: () => ({ setPageLoading: jest.fn() }),
  useUserProfileStore: () => ({ data: { passwordChanged: false } }),
  useToastStore: () => ({ setToastOpen: jest.fn() }),
}));

jest.mock('cookies-next', () => ({
  __esModule: true,
  ...jest.requireActual('cookies-next'),
  getCookie: jest.fn().mockReturnValue('MOCK_ACCESS_TOKEN')
}));

jest.mock('../../../../utils/axios', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

jest.mock('../../../../utils/axios/login', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));
describe('SetNewPasswordForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const setup = async () => {
    const { asFragment } = await act(async () =>
      render(<SetNewPasswordForm />)
    )
    return asFragment
  };

  it('renders the form correctly', async () => {
    await setup();
    expect(screen.getByTestId('newPassword')).toBeInTheDocument();
    expect(screen.getByTestId('confirmNewPassword')).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    await setup();
    const buttonToggleShowPassword = screen.getByTestId('button-toggle-show-new-password');
    const buttonToggleShowConfirmPassword = screen.getByTestId('button-toggle-show-confirm-password');
    const passwordInput = screen.getByPlaceholderText('ตั้งค่ารหัสผ่าน');

    expect(passwordInput).toHaveAttribute('type', 'password');

    await act(async () => {
      await userEvent.click(buttonToggleShowPassword);
      await userEvent.click(buttonToggleShowConfirmPassword);
    });

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute('type', 'text');
    });

    await act(async () => {
      await userEvent.click(buttonToggleShowPassword);
      await userEvent.click(buttonToggleShowConfirmPassword);
    });

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  it('submit button is initially disabled', async () => {
    await setup();
    const submitButton = screen.getByTestId('button-set-new-password');
    expect(submitButton).toBeDisabled();
  });
  it('show require validation', async () => {
    await setup();
    const newPasswordField = screen.getByTestId('newPassword').querySelector('input');
    const confirmNewPasswordField = screen.getByTestId('confirmNewPassword').querySelector('input');
    if (newPasswordField && confirmNewPasswordField) {
      fireEvent.change(newPasswordField, { target: { value: 'eetetetet' } });
      fireEvent.change(confirmNewPasswordField, { target: { value: 'eetetetet' } });
      await act(async () => {
        fireEvent.change(newPasswordField, { target: { value: null } });
        fireEvent.change(confirmNewPasswordField, { target: { value: null } });
      })
    }
    await waitFor(() => expect(screen.getAllByText(/จำเป็นต้องใส่ข้อมูล/)).not.toBeNull())
  });

  it('validation error for invalid password format', async () => {
    await setup();
    const newPasswordField = screen.getByTestId('newPassword').querySelector('input');
    const confirmNewPasswordField = screen.getByTestId('confirmNewPassword').querySelector('input');
    if (newPasswordField && confirmNewPasswordField) {
      fireEvent.change(newPasswordField, { target: { value: 'invalid format' } });
      fireEvent.change(confirmNewPasswordField, { target: { value: 'invalid format' } });
    }
    expect(screen.getAllByText(/รหัสผ่านไม่ตรงเงื่อนไข/)).not.toBeNull()
  });

  it('validation error for password mismatch', async () => {
    await setup();
    const newPasswordField = screen.getByTestId('newPassword').querySelector('input');
    const confirmNewPasswordField = screen.getByTestId('confirmNewPassword').querySelector('input');
    if (newPasswordField && confirmNewPasswordField) {
      fireEvent.change(newPasswordField, { target: { value: 'ValidPassword1!' } });
      fireEvent.change(confirmNewPasswordField, { target: { value: 'ValidPassword2!' } });
    }
    expect(screen.getAllByText(/รหัสผ่านไม่ตรงกัน/)).not.toBeNull()

  });

  it('response error message validation for matched', async () => {
    await setup();
    const newPasswordField = screen.getByTestId('newPassword').querySelector('input');
    const confirmNewPasswordField = screen.getByTestId('confirmNewPassword').querySelector('input');
    if (newPasswordField && confirmNewPasswordField) {
      fireEvent.change(newPasswordField, { target: { value: 'ValidPassword1!' } });
      fireEvent.change(confirmNewPasswordField, { target: { value: 'ValidPassword1!' } });
    }
    (axiosPublicInstance.post as jest.Mock).mockRejectedValueOnce({ status: 400, message: 'no user ' });
    const submitButton = screen.getByTestId('button-set-new-password')
    await act(async () => {
      fireEvent.click(submitButton)
    })
  });
  it('response error.error validation for matched', async () => {
    await setup();
    const newPasswordField = screen.getByTestId('newPassword').querySelector('input');
    const confirmNewPasswordField = screen.getByTestId('confirmNewPassword').querySelector('input');
    if (newPasswordField && confirmNewPasswordField) {
      fireEvent.change(newPasswordField, { target: { value: 'ValidPassword1!' } });
      fireEvent.change(confirmNewPasswordField, { target: { value: 'ValidPassword1!' } });
    }
    (axiosPublicInstance.post as jest.Mock).mockRejectedValueOnce({ status: 400, error: 'no user ' });
    const submitButton = screen.getByTestId('button-set-new-password')
    await act(async () => {
      fireEvent.click(submitButton)
    })
  });


  it('1 submits the form successfully with valid data', async () => {
    jest.spyOn(cookiesNext, 'getCookie').mockReturnValue(undefined);
    await setup();

    const newPasswordField = screen.getByTestId('newPassword').querySelector('input');
    const confirmNewPasswordField = screen.getByTestId('confirmNewPassword').querySelector('input');

    if (newPasswordField && confirmNewPasswordField) {
      fireEvent.change(newPasswordField, { target: { value: 'ValidPassword1!' } });
      fireEvent.change(confirmNewPasswordField, { target: { value: 'ValidPassword1!' } });
    }
    (axiosInstance.post as jest.Mock).mockResolvedValue({ status: 204 });

    const submitButton = screen.getByTestId('button-set-new-password')
    await act(async () => {
      fireEvent.click(submitButton)
    });

  });

  it('2 submits the form successfully with resset password token', async () => {
    jest.spyOn(cookiesNext, 'getCookie').mockReturnValue('MOCK_ACCESS_TOKEN' as any);
    await setup();

    const newPasswordField = screen.getByTestId('newPassword').querySelector('input');
    const confirmNewPasswordField = screen.getByTestId('confirmNewPassword').querySelector('input');

    if (newPasswordField && confirmNewPasswordField) {
      fireEvent.change(newPasswordField, { target: { value: 'ValidPassword1!' } });
      fireEvent.change(confirmNewPasswordField, { target: { value: 'ValidPassword1!' } });
    }

    (axiosPublicInstance.post as jest.Mock).mockResolvedValueOnce({ status: 204 });

    const submitButton = screen.getByTestId('button-set-new-password')
    await act(async () => {
      fireEvent.click(submitButton)
    });
  });

});