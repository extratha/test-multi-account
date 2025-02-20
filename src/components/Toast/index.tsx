"use client";

import { useCallback } from "react";
import { ToastSnackBar as UIToastSnackBar } from "./BaseToastSnackBar";

import { TOAST_AUTO_HIDE_DURATION } from "@/config";
import useToastStore from "@/store/useToastStore";

const ToastSnackBar = () => {
  const {
    open,
    description: { message = "", severity, anchorOrigin, icon, autoHideDuration },
    setToastOpen,
  } = useToastStore();

  const handleClose = useCallback(() => {
    setToastOpen(false);
  }, [setToastOpen]);

  return (
    <>
      {open && (
        <UIToastSnackBar
          open
          anchorOrigin={
            anchorOrigin || {
              vertical: "top",
              horizontal: "right",
            }
          }
          message={message}
          AlertProps={{
            onClose: handleClose,
            severity,
            icon,
            sx: {
              justifyContent: "center",
              alignItems: "center",
              background: (theme) => theme.palette[severity || "success"].light,
              color: (theme) => theme.palette.background.paper,
              fontWeight: "600",
              boxShadow: (theme) => theme.shadows[0],
              ".MuiSvgIcon-root": {
                width: (theme) => theme.spacing(3),
                height: (theme) => theme.spacing(3),
                fill: (theme) => theme.palette.background.paper,
              },
            },
          }}
          onClose={handleClose}
          autoHideDuration={autoHideDuration || TOAST_AUTO_HIDE_DURATION}
        />
      )}
    </>
  );
};

export default ToastSnackBar;
