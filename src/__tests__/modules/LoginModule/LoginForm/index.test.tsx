import React from 'react';
import { waitFor, act, render, screen, userEvent } from '../../../testUtils';
import LoginForm from '@/modules/LoginModule/LoginForm';
import '@testing-library/jest-dom';
import axiosPublicInstance from '@/utils/axios/login';
import { mockLoginResponse } from '@/__tests__/__mocks__/data';
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
}));
jest.mock('../../../../utils/axios/login', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}));

describe('LoginForm Component', () => {

  it('renders the login form with email and password fields', async () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText('อีเมล')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('รหัสผ่าน')).toBeInTheDocument();
    expect(screen.getByTestId('button-login')).toBeDisabled();
  });

  it('shows validation messages on email and password fields', async () => {
    await act(async () => {
      render(<LoginForm></LoginForm>)
    })
    const emailInput = screen.getByPlaceholderText('อีเมล');
    const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');

    await act(async () => {
      await userEvent.type(emailInput, 'invalid-email');
      await userEvent.type(passwordInput, '123');
      expect(await screen.findByText(/อีเมลไม่ถูกต้อง/)).toBeInTheDocument();
      expect(await screen.findByText(/รหัสผ่านต้องมีอย่างน้อย 8 หลัก/)).toBeInTheDocument();
    });
  });

  it('enables submit button when both fields are valid', async () => {
    await act(async () => {
      render(<LoginForm />);
    });

    const emailInput = screen.getByPlaceholderText('อีเมล');
    const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
    const submitButton = screen.getByTestId('button-login');

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'Test@passw0rd');
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('submits the form with valid inputs', async () => {
    render(<LoginForm></LoginForm>)
    const emailInput = screen.getByPlaceholderText('อีเมล');
    const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
    const submitButton = screen.getByTestId('button-login');

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'Test@passw0rd');
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });

    await act(async () => {
      await userEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getByText('Cariva Playground')).toBeInTheDocument();
    })
  });

  it('switch field password to type text.', async () => {
    const { asFragment } = await act(async () =>
      render(<LoginForm />),
    );

    const buttonToggleShowPassword = screen.getByTestId('button-toggle-show-password');
    const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');

    await act(async () => {
      await userEvent.click(buttonToggleShowPassword);
    });

    await waitFor(() => {
      expect(passwordInput).toHaveAttribute('type', 'text');
    });
  });
  it('redirects to forget password page when "Forget Password" link is clicked', async () => {
    await act(async () => {
      render(<LoginForm />);
    });

    const forgetPasswordLink = screen.getByText('ลืมรหัสผ่าน');
    expect(forgetPasswordLink).toBeInTheDocument();

    await act(async () => {
      await userEvent.click(forgetPasswordLink);
    });

  });

  it('submits the form with valid inputs', async () => {
    // Mock the axios response data
    const responseData = mockLoginResponse;
    // Provide a mock implementation for axios.post
    (axiosPublicInstance.post as jest.Mock).mockResolvedValueOnce({ data: responseData });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('อีเมล');
    const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
    const submitButton = screen.getByTestId('button-login');

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'Test@passw0rd');
    });
    await waitFor(async () => {
      await userEvent.click(submitButton);
    })

    expect(screen.getByText('Cariva Playground')).toBeInTheDocument();
  });

  it('submits the form with valid inputs with password changed false', async () => {
    // Mock the axios response data
    const responseData = mockLoginResponse;
    responseData.user.passwordChanged = false;
    // Provide a mock implementation for axios.post
    (axiosPublicInstance.post as jest.Mock).mockResolvedValueOnce({ data: responseData });

    render(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('อีเมล');
    const passwordInput = screen.getByPlaceholderText('รหัสผ่าน');
    const submitButton = screen.getByTestId('button-login');

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'Test@passw0rd');
    });
    await waitFor(async () => {
      await userEvent.click(submitButton);
    })

    expect(screen.getByText('Cariva Playground')).toBeInTheDocument();
  });

  it('to match snap', async () => {
    const { asFragment } = await act(async () =>
      render(
        <LoginForm />,
      ),
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot()
    });
  })
});