import { alpha, AppBar, styled, Toolbar, Typography } from "@mui/material";

export interface ConsentHeaderProps {
  title: string;
}

const HeaderBar = styled(AppBar)(({ theme }) => ({
  color: theme.palette.text.hight,
  backgroundColor: theme.palette.common.white,
  boxShadow: `0px 4px 6px -1px ${alpha(theme.palette.common.black, 0.1)}`,
  "& > .MuiToolbar-root": {
    justifyContent: "center",
  },
}));

const ConsentHeader = ({ title }: ConsentHeaderProps) => {
  return (
    <HeaderBar>
      <Toolbar variant="dense">
        <Typography variant="bodyBold" textAlign="center">
          {title}
        </Typography>
      </Toolbar>
    </HeaderBar>
  );
};

export default ConsentHeader;
