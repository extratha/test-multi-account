import { Container, Stack } from "@mui/material";

import Spinner from "@/components/Spinner";

const Loading = () => {
  return (
    <Container maxWidth="sm" sx={{ px: 4, height: "100vh" }}>
      <Stack justifyContent="center" alignItems="center" height="80%">
        <Spinner />
      </Stack>
    </Container>
  );
};

export default Loading;
