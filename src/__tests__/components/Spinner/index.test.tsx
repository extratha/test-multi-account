import { render, screen } from '@testing-library/react';
import Spinner from '@/components/Spinner';

describe('Spinner component', () => {
  it('renders spinner when show prop is true', () => {
    render(<Spinner show={true} />);
    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });

  it('does not render spinner when show prop is false', () => {
    render(<Spinner show={false} />);
    const spinner = screen.queryByRole('progressbar');
    expect(spinner).not.toBeInTheDocument();
  });

  it('renders with prop is  provided', () => {
    render(<Spinner width={120} height={200}/>);
    const spinner = screen.getByRole('progressbar');
  });

});
