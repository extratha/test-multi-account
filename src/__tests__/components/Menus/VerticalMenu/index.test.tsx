import React from 'react';
import { fireEvent, screen, act, waitFor, render, userEvent } from '../../../testUtils';
import VerticalMenu from '@/components/Menus/VerticalMenu';
import { webPaths } from '@/constant/webPaths';
import { useUserProfileStore } from '@/store';
import { deleteCookie } from 'cookies-next';
import mockRouter from 'next-router-mock'

mockRouter.setCurrentUrl('/th/home');

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue('/th/home'),
  useParams: jest.fn(() => ({ locale: 'th' })),
}));

jest.mock('../../../../store', () => ({
  useUserProfileStore: jest.fn(),
}));

jest.mock('cookies-next', () => ({
  deleteCookie: jest.fn(),
}));
const mockRouterReplace = jest.fn();
const mockResetUserProfile = jest.fn();

const setIsMenuExpand = jest.fn();
describe('ProjectCoverLayout', () => {

  beforeEach(() => {
    (useUserProfileStore as any).mockReturnValue({
      data: { email: 'admin@example.com' },
      resetUserProfile: mockResetUserProfile,
    });

    const useRouter = require('next/navigation').useRouter;
    useRouter.mockReturnValue({
      replace: mockRouterReplace,
    });
  });

  it('renders menu items correctly', async () => {
    await act(async () =>
      render(<VerticalMenu />),
    );

    expect(screen.getByText(/เครื่องมือวิเคราะห์ข้อมูลด้วย AI/)).toBeInTheDocument();
    expect(screen.getByText(/การตั้งค่าและอื่นๆ/)).toBeInTheDocument();
  });

  it('handles menu expand and collapse', async () => {
    await act(async () =>
      render(<VerticalMenu />),
    );

    const firstMenu = screen.getByText(/AI Interpret/).closest('li');
    if (firstMenu) {
      const expandIcon = screen.getByTestId('icon-expand');

      if (expandIcon) {
        await act(async () => {
          fireEvent.click(expandIcon);
          await waitFor(() => {
            expect(screen.getByText(/ทดลองใช้ข้อมูลตัวอย่าง/)).toBeInTheDocument();
          });
        })


        await  act (async ()=> {
          const groupCollapse = screen.getByTestId(`menu-group-collapse-${1}`)
          await waitFor(() => {
            fireEvent.click(expandIcon);
          })
          await waitFor(async () => {
            expect(groupCollapse).toHaveStyle('height: 0px');
          });
        })
      }
    }

  });

  it('handles logout correctly', async () => {
    await act(async () =>
      render(<VerticalMenu />),
    );
    fireEvent.click(screen.getByText(/ออกจากระบบ/));

    await waitFor(() => {
      expect(deleteCookie).toHaveBeenCalledWith('accessToken');
      expect(deleteCookie).toHaveBeenCalledWith('refreshToken');
      expect(deleteCookie).toHaveBeenCalledWith('passwordChanged');
      expect(mockResetUserProfile).toHaveBeenCalled();
      expect(mockRouterReplace).toHaveBeenCalledWith(webPaths.login);
    });
  });

  it('hides menu based on pathname change', async () => {
    render(<VerticalMenu />);
  
    const menuContainer = screen.getByTestId('vertical-menu-container');
  
    mockRouter.setCurrentUrl(`/th${webPaths.login}`);
  
  });

  it('displays user profile info correctly', async () => {
    await act(async () =>
      render(<VerticalMenu />),
    );

    expect(screen.getByText('admin@example.com')).toBeInTheDocument();
    expect(screen.getByText('ใช้ได้ไม่จำกัด')).toBeInTheDocument();
  });


  it('to match snap', async () => {
    const { asFragment } = await act(async () =>
      render(
        <VerticalMenu></VerticalMenu>,
      ),
    );
    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot()
    });
  })

});