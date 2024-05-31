import React from 'react';
import { fireEvent, screen, act, waitFor, render, userEvent } from '../../../testUtils';
import GridMenu from '@/components/Menus/GridMenu';
import { aiMenuList } from '@/constant/menu';

describe('GridMenu Component', () => {

  const mockTFunction = (key: string) => key;

  it('can render and click menu item', async () => {
    await act(async () =>
      render(
        <GridMenu menus={aiMenuList(mockTFunction)}></GridMenu>,
      ),
    );
    const menuItem = screen.getByTestId('menu-item-0')
    await act(()=>{
      fireEvent.click(menuItem)
    })
  })
  it('to match snap', async () => {
    const { asFragment } = await act(async () =>
      render(
        <GridMenu menus={aiMenuList(mockTFunction)}></GridMenu>,
      ),
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot()
    });
  })

});