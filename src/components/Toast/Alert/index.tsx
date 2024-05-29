import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      iconMapping={{
        success: <CheckCircleOutlineRoundedIcon fontSize="inherit" />,
        error: <ErrorOutlineRoundedIcon fontSize="inherit" />,
      }}
      {...props}
    />
  );
});

export default Alert;
