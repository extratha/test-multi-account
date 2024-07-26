"use client";

import { Container as MuiContainer, Stack, styled, Typography } from "@mui/material";

const Container = styled(MuiContainer)({
  flex: 1,
  display: "flex",
});

const Content = styled(Stack)({
  width: "100%",
  margin: "auto 0px",
  padding: "32px",
  textAlign: "center",
});

const PageNotFound = () => {
  return (
    <Container data-testid="page-not-found">
      <Content spacing="8px">
        <Typography variant="headerSemiBold">{"404 - Page Not Found"}</Typography>
        <Typography>{"Oops! It seems like the page you're looking for seems to have vanished."}</Typography>
      </Content>
    </Container>
  );
};

export default PageNotFound;
