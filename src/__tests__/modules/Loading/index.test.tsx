import React from 'react';
import { act, waitFor, render } from '../../testUtils';
import Loading from '@/modules/Loading';

describe('LoadingModule', () => {
  it('to match snap', async () => {
    const { asFragment } = await act(async () =>
      render(
        <Loading />,
      ),
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot()
    });
  })
});