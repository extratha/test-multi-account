import React from 'react';
import { act, waitFor, render } from '../../testUtils';
import SetNewPasswordModule from '@/modules/SetNewPasswordModule';

// Mock the module
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
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