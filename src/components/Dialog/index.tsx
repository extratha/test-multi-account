import {
  Button,
  Dialog as MuiDialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

export interface DialogProps {
  name: string;
  open: boolean;
  logo?: ReactNode;
  title: string;
  description: string;
  confirm: string;
  cancel?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  className?: string;
}

const DialogWrapper = styled(MuiDialog)({
  "& .MuiPaper-root": {
    width: "400px",
    borderRadius: "12px",
  },
});

const DialogLogo = styled(Stack)({
  padding: "24px 24px 0px",
  alignItems: "center",
});

const DialogTitle = styled(MuiDialogTitle)({
  fontSize: "24px",
  fontWeight: "700",
  textAlign: "center",
  whiteSpace: "pre-line",
});

const DialogContent = styled(MuiDialogContent)(({ theme }) => ({
  textAlign: "center",
  whiteSpace: "pre-line",

  color: theme.palette.text.medium,
}));

const DialogActions = styled(MuiDialogActions)(({ theme }) => ({
  padding: "0px 24px 24px",
  gap: "16px",
  "& .MuiButton-root": {
    width: "100%",
    height: "44px",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: "600",
    borderRadius: "8px",
  },
  "& > .confirm-button": {
    backgroundColor: theme.palette.background.grayHight,
    "&:hover": {
      backgroundColor: theme.palette.grey[800],
    },
  },
  "& > .cancel-button": {
    background: theme.palette.background.paper,
    color: theme.palette.text.primary,
    "&:hover": {
      backgroundColor: theme.palette.background.grayLight,
    },
  },
}));

const Dialog = ({
  name,
  open,
  logo,
  title,
  description,
  confirm,
  onConfirm,
  cancel,
  onCancel,
  className,
}: DialogProps) => {
  return (
    <DialogWrapper open={open} data-testid={`${name}-dialog`} className={className}>
      {logo && <DialogLogo data-testid={`${name}-dialog-logo`}>{logo}</DialogLogo>}
      <DialogTitle data-testid={`${name}-dialog-title`} className="dialog-title">
        {title}
      </DialogTitle>
      <DialogContent data-testid={`${name}-dialog-description`} className="dialog-content">
        {description}
      </DialogContent>
      <DialogActions disableSpacing className="dialog-action">
        {cancel && (
          <Button
            variant="contained"
            data-testid={`${name}-cancel-button`}
            className="cancel-button"
            onClick={onCancel}
          >
            {cancel}
          </Button>
        )}
        <Button
          variant="contained"
          data-testid={`${name}-confirm-button`}
          className="confirm-button"
          onClick={onConfirm}
        >
          {confirm}
        </Button>
      </DialogActions>
    </DialogWrapper>
  );
};

export default Dialog;
