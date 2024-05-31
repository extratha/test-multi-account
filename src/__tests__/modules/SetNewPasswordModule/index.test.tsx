import React from 'react';
import { act, waitFor, render } from '../../testUtils';
import SetNewPasswordModule from '@/modules/SetNewPasswordModule';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
}));

describe('LoginModule', () => {
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('to match snap', async () => {
    const { asFragment } = await act(async () =>
      render(
        <SetNewPasswordModule />,
      ),
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot()
    });
  })
});