import { render, screen } from '@testing-library/react';
import useModal from '@/store/modal';
import ModalLayer from '@/components/Modal/ModalLayer';



jest.mock('../../../../store/modal', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ModalLayer component', () => { 
  const closeModalMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

  });

  it('renders the modal when visible', () => {
    const mockModalContent = () => (
      <div data-testid="modal-content">
        Modal Content
        <button onClick={closeModalMock}>Close</button>
      </div>
    );

    (useModal as any).mockReturnValue({
      modal: {
        isVisible: true,
        content: mockModalContent,
      },
      closeModal: closeModalMock,
    });

    render(<ModalLayer />);
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });


});
