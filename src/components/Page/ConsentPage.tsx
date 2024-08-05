import { Container as MuiContainer, Paper as MuiPaper, Stack, styled } from "@mui/material";
import { ReactNode } from "react";

interface ConsentPageProps {
  className?: string;
  children: ReactNode;
}

const Backdrop = styled(Stack)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: -1,
  backgroundColor: theme.palette.blueGrey[50],
}));

const Container = styled(MuiContainer)({
  maxWidth: "1024px",
  margin: "0px auto",
  padding: "24px 16px",
});

const Paper = styled(MuiPaper)({
  padding: "36px 40px",
  borderRadius: "16px",
  boxShadow: "none",
});

const ConsentPage = ({ className, children }: ConsentPageProps) => {
  return (
    <>
      <Backdrop />
      <Container className={className}>
        <Paper>{children}</Paper>
      </Container>
    </>
  );
};

export default ConsentPage;
