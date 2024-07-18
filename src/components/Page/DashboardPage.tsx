import { Paper, Stack, styled } from "@mui/material";
import { ReactNode } from "react";

interface DashboardPageProps {
  children: ReactNode;
}

export const Wrapper = styled(Stack)({
  flex: 1,
  padding: "24px",
  overflow: "hidden",
});

export const Container = styled(Paper)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "auto",
  borderRadius: "16px",
  boxShadow: "none",
});

const DashboardPage = ({ children }: DashboardPageProps) => {
  return (
    <Wrapper>
      <Container>
        <Stack flex="1">{children}</Stack>
      </Container>
    </Wrapper>
  );
};

export default DashboardPage;
