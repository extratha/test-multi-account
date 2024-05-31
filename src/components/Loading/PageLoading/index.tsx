'use client'
import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Image from 'next/image';
import { usePageLoadingStore } from '@/store';
import { ImageLoadingStack } from '@/assets';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const PageLoading = () => {
  const { isPageLoading, setPageLoading } = usePageLoadingStore();
  const pathname = usePathname()
  useEffect(() => {
    setPageLoading(false)
  }, [pathname])
  return (
    <span>
      <Backdrop
        data-testid="backdrop-loading"
        sx={{
          zIndex: (theme) => theme.zIndex.tooltip + 1,
        }}
        open={isPageLoading}
      >
        <Image data-testid="img-loading-stack" alt='' src={ImageLoadingStack} style={{ width: '70px', height: '70px' }}></Image>
      </Backdrop>
    </span>
  );
};

export default PageLoading;
