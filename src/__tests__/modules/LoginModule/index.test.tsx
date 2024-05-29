import React from 'react';
import { act, waitFor, render } from '../../testUtils';
import LoginModule from '@/modules/LoginModule';
import { webPaths } from '@/constant/webPaths';
import * as cookiesNext from 'cookies-next';
// Import the module to mock
import * as nextRouter from 'next/router';

// Mock the module
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('LoginModule', () => {
  beforeEach(() => {
    // Mock getCookie function to return a token
    jest.spyOn(cookiesNext, 'getCookie').mockReturnValue('accessToken');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to home page if accessToken exists', () => {
    // Mock router.replace function
    const replaceMock = jest.fn();
    (nextRouter.useRouter as any).mockReturnValue({ replace: replaceMock });
    jest.spyOn(cookiesNext, 'getCookie').mockReturnValue('TOKENTOKENTOKEN' as any);

    render(<LoginModule />);

  });

  it('renders login form if accessToken does not exist', () => {
    // Mock router.replace function
    const replaceMock = jest.fn();
    (nextRouter.useRouter as any).mockReturnValue({ replace: replaceMock });

    // Mock getCookie function to return null
    jest.spyOn(cookiesNext, 'getCookie').mockReturnValue(null as any);

    render(<LoginModule />);

  });
  it('to match snap', async () => {
    const { asFragment } = await act(async () =>
      render(
        <LoginModule />,
      ),
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot()
    });
  })
});