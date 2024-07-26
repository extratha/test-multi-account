import { Button, DialogContent, Dialog as MuiDialog, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactNode } from "react";

export interface DialogProps {
  name: string;
  open: boolean;
  logo?: ReactNode;
  title: string;
  description?: string;
  confirm: string;
  onConfirm: () => void;
  className?: string;
}

const DialogWrapper = styled(MuiDialog)({
  "& .MuiPaper-root": {
    borderRadius: "12px",
  },
});

const Content = styled(DialogContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "24px",
});

const TextTitle = styled(Typography)({
  textAlign: "center",
  whiteSpace: "pre-line",
});

const TextDescription = styled(Typography)({
  fontSize: "20px",
  textAlign: "center",
  whiteSpace: "pre-line",
});

const ButtonConfirm = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "44px",
  padding: "10px 18px",
  fontSize: "14px",
  fontWeight: "600",
  borderRadius: "8px",
  backgroundColor: theme.palette.grey[900],
  "&:hover": {
    backgroundColor: theme.palette.grey[900],
  },
}));

const Dialog = ({ name, open, logo, title, description, confirm, onConfirm, className }: DialogProps) => {
  return (
    <DialogWrapper open={open} data-testid={`${name}-dialog`} className={className}>
      <Content className="content-dialog">
        <Stack spacing="16px" marginBottom="24px" alignItems="center">
          {logo && <Stack data-testid={`${name}-dialog-logo`}>{logo}</Stack>}
          <TextTitle variant="headerBold" data-testid={`${name}-dialog-title`}>
            {title}
          </TextTitle>
          {description && (
            <TextDescription variant="bodySmall" color="text.medium" data-testid={`${name}-dialog-description`}>
              {description}
            </TextDescription>
          )}
        </Stack>
        <ButtonConfirm
          variant="contained"
          data-testid={`${name}-confirm-button`}
          className="confirm-button"
          onClick={onConfirm}
        >
          {confirm}
        </ButtonConfirm>
      </Content>
    </DialogWrapper>
  );
};

export default Dialog;
