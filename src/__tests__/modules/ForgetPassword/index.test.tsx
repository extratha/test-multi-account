import React from 'react';
import { act, waitFor, render } from '../../testUtils';
import ForgetpasswordModule from '@/modules/ForgetPassword';

describe('ForgetPassword Module', () => {
  it('to match snap', async () => {
    const { asFragment } = await act(async () =>
      render(
        <ForgetpasswordModule />,
      ),
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot()
    });
  })
});