import { Button, Dialog as MuiDialog, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";

import { IconErrorCircle, ImageLoadingStack } from "@/assets";
import { INTERPRET_STATUS } from "@/constant";
import useTranslation from "@/locales/useLocale";

const Dialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.common.transparent,
    boxShadow: "none",
  },
}));

const Content = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  color: theme.palette.common.white,
}));

const StatusImage = styled(Image)({
  width: "100px",
  height: "100px",
});

const StatusMessage = styled(Typography)({
  marginTop: "18px",
  whiteSpace: "pre-line",
});

const ButtonAction = styled(Button)(({ theme }) => ({
  width: "150px",
  height: "46px",
  marginTop: "36px",
  backgroundColor: theme.palette.common.transparent,
  color: theme.palette.common.white,
  border: `2px solid ${theme.palette.common.white}`,
}));

export interface InterpretModalProps {
  status: string;
  onClose?: () => void;
}

const InterpretModal = ({ status, onClose }: InterpretModalProps) => {
  const { translation } = useTranslation();

  return (
    <Dialog open>
      <Content>
        {status === INTERPRET_STATUS.PENDING && (
          <>
            <StatusImage data-testid="interpret-image-pending" alt="" src={ImageLoadingStack} />
            <StatusMessage variant="bodyBold">{translation("AiInterpret.text.interpreting")}</StatusMessage>
            <ButtonAction data-testid="modal-ok-button" onClick={onClose}>
              {translation("AiInterpret.button.cancel")}
            </ButtonAction>
          </>
        )}
        {status === INTERPRET_STATUS.FAILED && (
          <>
            <IconErrorCircle data-testid="interpret-image-failed" />
            <StatusMessage variant="bodyBold" textAlign="center">
              {translation("AiInterpret.text.failedInterpret")}
            </StatusMessage>
            <ButtonAction data-testid="modal-retry-button" onClick={onClose}>
              {translation("AiInterpret.button.retry")}
            </ButtonAction>
          </>
        )}
      </Content>
    </Dialog>
  );
};

export default InterpretModal;
