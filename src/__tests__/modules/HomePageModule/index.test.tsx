import React from 'react';
import { act, waitFor, render } from '../../testUtils';
import HomePageModule from '@/modules/HomePageModule';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
}));

describe('HomePageModule', () => {
  it('to match snap', async () => {
    const { asFragment } = await act(async () =>
      render(
        <HomePageModule />,
      ),
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot()
    });
  })
});