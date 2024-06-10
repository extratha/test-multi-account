import { Stack, styled } from "@mui/material";

export const VerticalMenuContainer = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  maxWidth: "330px",
  minWidth: "330px",
  height: "100vh",
  padding: "1.5rem 1.5rem 1rem",
  overflowY: "scroll",
}));

export const ProfileInfoBox = styled(Stack)({
  background: "linear-gradient(94.13deg, #0059D6 0%, #028DF5 50%, #00CBDD 100%)",
  borderRadius: "24px",
  minHeight: "260px",
  padding: "18px",
  position: "relative",
});
