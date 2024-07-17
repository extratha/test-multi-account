import { AlertProps as MuiAlertProps } from "@mui/material/Alert";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import React, { FC } from "react";

import { TOAST_AUTO_HIDE_DURATION } from "@/config";
import Alert from "../Alert";

export type ToastSnackBarProps = {
  open: boolean;
  message: string;
  anchorOrigin: {
    vertical: "top" | "bottom";
  };
  AlertProps: MuiAlertProps;
  onClose?: () => void;
} & SnackbarProps;

export const ToastSnackBar: FC<ToastSnackBarProps> = ({
  open = false,
  message,
  anchorOrigin = { vertical: "bottom", horizontal: "left" },
  onClose,
  AlertProps = {
    severity: "success",
  },
  ...rest
}) => {
  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    onClose?.();
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={open}
        key={`snackbar-key-${message}-${AlertProps.severity ?? ""}`}
        autoHideDuration={TOAST_AUTO_HIDE_DURATION}
        onClose={handleClose}
        {...rest}
      >
        <Alert
          {...AlertProps}
          onClose={handleClose}
          sx={{ height: "60px", width: "100%", maxWidth: "100%", minWidth: 256, ...AlertProps.sx }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
