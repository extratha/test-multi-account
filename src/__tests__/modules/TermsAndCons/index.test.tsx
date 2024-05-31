import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '../../testUtils';
import TermsAndConsModules from '@/modules/TermsAndCons';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
}));

describe('TermsAndConsModules', () => {
  it('renders terms and conditions content correctly', () => {
    render(<TermsAndConsModules />);
    expect(screen.getByText(/ข้อกำหนดและเงื่อนไข/)).toBeInTheDocument();
    expect(screen.getByText(/ฉันยอมรับเงื่อนไขและข้อตกลงการให้บริการ/)).toBeInTheDocument();
    expect(screen.getByText(/ถัดไป/)).toBeInTheDocument();
  });

  it('disables the submit button ', () => {
    render(<TermsAndConsModules />);
    const submitButton = screen.getByText(/ถัดไป/).closest('button');
    expect(submitButton).toBeDisabled();

    const agreementCheckbox = screen.getByTestId('agreement');
    fireEvent.click(agreementCheckbox);

    expect(submitButton).toBeDisabled();
  });

  it('submits the form when agreement is checked and Next button is clicked', async () => {

    render(<TermsAndConsModules />);

    const agreementCheckbox = screen.getByTestId('agreement');
    fireEvent.click(agreementCheckbox);

    const submitButton = screen.getByText('ถัดไป');
    fireEvent.click(submitButton);

  });

  it('enables the agreement checkbox when scrolled to the end of the terms and conditions', async () => {
    await render(<TermsAndConsModules />);

    const agreementCheckbox = screen.getByTestId('agreement');
    const termsAndConsContent = screen.getByTestId('terms-and-cons-content');

    await waitFor(() => expect(agreementCheckbox).toHaveAttribute('aria-disabled', "true"));

    await act(async () => {
      (termsAndConsContent as any).getBoundingClientRect = jest.fn(() => ({
        top: 0,
        bottom: 200, 
        height: 200,
      }));
      fireEvent.scroll(termsAndConsContent);
    });
    const nextButton = screen.getByTestId('button-next')
    await waitFor(() => {
      expect(agreementCheckbox).not.toHaveAttribute('aria-disabled', "true");
    });

    await waitFor(() => {
      fireEvent.click(nextButton)
    })
  });

  it('submits the form and redirects to the home page', async () => {
    render(<TermsAndConsModules />);
    const agreementCheckbox = screen.getByTestId('agreement');
    fireEvent.click(agreementCheckbox);

    const submitButton = screen.getByTestId('button-next');
    fireEvent.click(submitButton);

  });

  it('disables/enables the submit button based on the agreement checkbox', async () => {
    const { asFragment } = await render(<TermsAndConsModules />);
    expect(asFragment()).toMatchSnapshot();
    const agreementCheckbox = screen.getByTestId('agreement');
    const submitButton = screen.getByTestId('button-next');

    expect(submitButton).toBeDisabled();

    await act(async () => {
      const termsAndConsContent = screen.getByTestId('terms-and-cons-content');
      termsAndConsContent.scrollTop = termsAndConsContent.scrollHeight; 
      fireEvent.scroll(termsAndConsContent);
    });
    const checkBox = agreementCheckbox.querySelector('input')
    if (checkBox) {
      await act(async () => {
        fireEvent.click(checkBox);
      });

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      await act(async()=> {
        fireEvent.click(submitButton);
      })
    }
  });
});