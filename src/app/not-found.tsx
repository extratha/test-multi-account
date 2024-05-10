import { Box, Container, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Container>
      <Box
        display="flex"
        height="100vh"
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography
          fontSize={22}
          textAlign={'center'}
          fontWeight={600}
          marginBottom={1}
        >
          {'404 - Page Not Found'}
        </Typography>
        <Typography textAlign="center">
          {
            "Oops! It seems like the page you're looking for seems to have vanished."
          }
        </Typography>
      </Box>
    </Container>
  );
}
