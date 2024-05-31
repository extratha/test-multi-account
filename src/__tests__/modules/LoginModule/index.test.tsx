import React from 'react';
import { act, waitFor, render } from '../../testUtils';
import LoginModule from '@/modules/LoginModule';
import { webPaths } from '@/constant/webPaths';
import * as cookiesNext from 'cookies-next';
import * as nextRouter from 'next/navigation';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
}));

describe('LoginModule', () => {
  beforeEach(() => {
    jest.spyOn(cookiesNext, 'getCookie').mockReturnValue('accessToken');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to home page if accessToken exists', () => {
    const replaceMock = jest.fn();
    (nextRouter.useRouter as any).mockReturnValue({ replace: replaceMock });
    jest.spyOn(cookiesNext, 'getCookie').mockReturnValue('TOKENTOKENTOKEN' as any);

    render(<LoginModule />);

  });

  it('renders login form if accessToken does not exist', () => {
    const replaceMock = jest.fn();
    (nextRouter.useRouter as any).mockReturnValue({ replace: replaceMock });

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