import { InfoOutlined } from "@mui/icons-material";
import { Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps, Stack, styled, tooltipClasses } from "@mui/material";
import { ReactNode } from "react";

export interface TooltipProps {
  content: ReactNode;
}

const Wrapper = styled(({ className, ...props }: MuiTooltipProps) => (
  <MuiTooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    minWidth: "280px",
    padding: "12px",
    borderRadius: "8px",
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
    boxShadow: theme.shadows[1],
  },
  [`& .${tooltipClasses.tooltipPlacementBottom}`]: {
    marginBottom: "36px",
  },
}));

const IconInfo = styled(InfoOutlined)(({ theme }) => ({
  fontSize: "20px",
  color: theme.palette.text.medium,
}));

const Tooltip = ({ content, ...props }: TooltipProps) => {
  return (
    <Wrapper title={content} {...props}>
      <Stack>
        <IconInfo />
      </Stack>
    </Wrapper>
  );
};

export default Tooltip;
