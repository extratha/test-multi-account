import { Box, CircularProgress, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Image from 'next/image';
import { usePageLoadingStore } from '@/store';

const PageLoading = () => {
  const { isPageLoading } = usePageLoadingStore();

  return (
    <span>
      {/* ใส่ใน div ได้ error hydration ทำไมต้องใส่ span ถึงไม่ error งง */}
      <Backdrop
        sx={{
          zIndex: (theme) => theme.zIndex.tooltip + 1,
        }}
        open={isPageLoading}
      >
        <CircularProgress
          sx={{ color: (theme) => theme.palette.background.paper }}
        />
      </Backdrop>
    </span>
  );
};

export default PageLoading;
