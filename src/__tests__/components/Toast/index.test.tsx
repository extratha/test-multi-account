import { act, waitFor, render, screen, fireEvent } from '@testing-library/react';
import ToastSnackBar from '@/components/Toast';
import useToastStore from '@/store/useToastStore';
import { Stack } from '@mui/material';
import userEvent from '@testing-library/user-event';

jest.mock('../../../store/useToastStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));
describe('ToastSnackBar component', () => {
  const setToastOpenMock = jest.fn();
  beforeEach(() => {
    (useToastStore as any).mockReturnValue({
      open: true,
      description: {
        message: 'Test message',
        severity: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        icon: null,
      },
      setToastOpen: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with the correct message and severity', () => {
    render(<ToastSnackBar />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-standardSuccess');
  });

  it('calls setToastOpen when handleClose is called', () => {
    render(<ToastSnackBar />);
    fireEvent.click(screen.getByRole('button'));
    expect(useToastStore().setToastOpen).toHaveBeenCalledWith(false);
  });

  it('renders with the correct default anchor origin', async () => {
    await act(async () =>
      render(
        <ToastSnackBar />
      ),
    );
  });

  it('renders with the open false', async () => {
    (useToastStore as any).mockReturnValue({
      open: true,
      description: {
        message: 'Test message',
        severity: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
        icon: null,
      },
      setToastOpen: jest.fn(),
    });
    await act(async () =>
      render(
        <ToastSnackBar />
      ),
    );

    fireEvent.click(screen.getByRole('button'));
  });

  it('calls onClose when Snackbar is closed due to clickaway', async () => {
    await render(
      <div data-testid="wrapper">
        <span data-testid="placeholder-element">Placeholder Element</span>
        <ToastSnackBar />
      </div>
    );
    fireEvent.click(screen.getByRole('button'));
    const someText = screen.getByTestId('placeholder-element')
    const wrapper = screen.getByTestId('wrapper')
    await waitFor(async () => {
      fireEvent.click(someText);
    })

    await waitFor(() => {
      fireEvent.click(wrapper)

    })
  });

  it('renders with the provided anchor origin', () => {
    (useToastStore as any).mockReturnValueOnce({
      ...useToastStore(),
      description: {
        ...useToastStore().description,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      },
    });
    render(<ToastSnackBar />);
    fireEvent.click(screen.getByRole('button'));
  });

  it('renders ToastSnackBar with default anchorOrigin', () => {
    (useToastStore as any).mockReturnValueOnce({
      open: true,
      description: {
        message: 'Test message',
        severity: 'success',
        icon: null,
      },
      setToastOpen: setToastOpenMock,
    });

    render(<ToastSnackBar />);
  });
  it('renders ToastSnackBar with default anchorOrigin', () => {
    (useToastStore as any).mockReturnValueOnce({
      open: true,
      description: {
        message: '',
        severity: 'error',
        icon: <div></div>,
      },
      setToastOpen: setToastOpenMock,
    });

    render(<ToastSnackBar />);
  });
  it('renders ToastSnackBar with default severity and icon', () => {
    (useToastStore as any).mockReturnValueOnce({
      open: true,
      description: {
        message: 'Test message',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      },
      setToastOpen: setToastOpenMock,
    });

    render(<ToastSnackBar />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('MuiAlert-colorSuccess');
    expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument();
  });
});