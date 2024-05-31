import { act, render, screen } from '../../../testUtils';
import { usePageLoadingStore } from '@/store';
import { usePathname } from 'next/navigation';
import PageLoading from '@/components/Loading/PageLoading';
import '@testing-library/jest-dom';

jest.mock('../../../../store', () => ({
  usePageLoadingStore: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('next/image', () => (props: any) => <img {...props} alt="" data-testid="img-loading-stack"/>);

describe('PageLoading', () => {
  const setPageLoadingMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (usePageLoadingStore as any).mockReturnValue({
      isPageLoading: false,
      setPageLoading: setPageLoadingMock,
    });

    (usePathname as jest.Mock).mockReturnValue('/login');
  });

  it('renders without crashing', () => {
    render(<PageLoading />);
    expect(screen.getByTestId('img-loading-stack')).toBeInTheDocument();
  });

  it('shows backdrop when isPageLoading is true', () => {
    (usePageLoadingStore as any).mockReturnValue({
      isPageLoading: true,
      setPageLoading: setPageLoadingMock,
    });

    render(<PageLoading />);
    expect(screen.getByTestId('backdrop-loading')).toHaveStyle('opacity: 1');
  });

  it('hides backdrop when isPageLoading is false', () => {
    (usePageLoadingStore as any).mockReturnValue({
      isPageLoading: false,
      setPageLoading: setPageLoadingMock,
    });

    render(<PageLoading />);
    expect(screen.getByTestId('backdrop-loading')).toHaveStyle('opacity: 0');
  });

  it('calls setPageLoading(false) when pathname changes', () => {
    (usePageLoadingStore as any).mockReturnValue({
      isPageLoading: true,
      setPageLoading: setPageLoadingMock,
    });
    let currentPathname = '/login';
    (usePathname as jest.Mock).mockImplementation(() => currentPathname);
    
    render(<PageLoading />);

    expect(setPageLoadingMock).toHaveBeenCalled();

    act(() => {
      currentPathname = '/home';
    });

    render(<PageLoading />);
    expect(setPageLoadingMock).toHaveBeenCalled();
  });
});