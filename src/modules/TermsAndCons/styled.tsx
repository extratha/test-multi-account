import { NEUTRAL_VARIANT } from "@/config/config-mui/theme/colors";
import { Stack, styled } from "@mui/material";

export const TermsAndConsHeader = styled(Stack)(({ theme }) => ({
  width: "100%",
  maxHeight: "50px",
  padding: "1em 0",
  background: theme.palette.background.paper,
  justifyContent: "center",
  boxShadow: `10px 2px 10px 5px ${NEUTRAL_VARIANT[90]}`,
}));

export const TermsAndConsContent = styled(Stack)(({ theme }) => ({
  padding: "2rem",
  margin: "1rem ",
  borderRadius: "16px",
  maxWidth: "1024px",
  height: "calc(100vh - 85px)",
  background: theme.palette.background.paper,
  boxShadow: `0px 2px 10px 0px ${NEUTRAL_VARIANT[90]}`,
}));

export const TermsAndConstMessage = styled(Stack)(({ theme }) => ({
  padding: "2rem",
  margin: "10px auto 1rem",
  backgroundColor: theme.palette.grey[50],
  borderRadius: "16px",
  width: "fill-available",
  maxHeight: "78%",
  overflowY: "auto",
}));
