import { IconErrorCircle, ImageLoadingStack } from "@/assets";
import { INTERPRET_STATUS } from "@/constant/constant";
import useTranslation from "@/locales/useLocale";
import { BaseModalProps } from "@/store";
import { Button, Stack, styled, Typography } from "@mui/material";
import Image from "next/image";

const ModalStackWrapper = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  color: theme.palette.background.paper,
}));

const StatusImageInModal = styled(Image)({
  width: "100px",
  height: "100px",
});

const StatusMessage = styled(Typography)({
  marginTop: "18px",
  whiteSpace: "pre-line",
});

const ButtonInModal = styled(Button)(({ theme }) => ({
  width: "150px",
  height: "46px",
  marginTop: "36px",
  backgroundColor: "transparent",
  color: theme.palette.background.paper,
  border: `2px solid ${theme.palette.background.paper}`,
  fontWeight: 600,
}));

export interface InterpretingModalsProps extends BaseModalProps {
  interpretStatus: string;
}

const InterpretingModals = (props: InterpretingModalsProps) => {
  const { closeModal, interpretStatus } = props;
  const { translation } = useTranslation();

  return (
    <ModalStackWrapper>
      {interpretStatus === INTERPRET_STATUS.PENDING && (
        <>
          <StatusImageInModal data-testid="interpret-image-pending" alt="" src={ImageLoadingStack} />
          <StatusMessage variant="bodyBold">{translation("AiInterpret.text.interpreting")}</StatusMessage>
          <ButtonInModal data-testid="modal-ok-button" onClick={closeModal}>
            {translation("AiInterpret.button.ok")}
          </ButtonInModal>
        </>
      )}
      {interpretStatus === INTERPRET_STATUS.FAILED && (
        <>
          <IconErrorCircle data-testid="interpret-image-failed" />
          <StatusMessage variant="bodyBold" textAlign="center">
            {translation("AiInterpret.text.failedInterpret")}
          </StatusMessage>
          <ButtonInModal data-testid="modal-retry-button" onClick={closeModal}>
            {translation("AiInterpret.button.retry")}
          </ButtonInModal>
        </>
      )}
    </ModalStackWrapper>
  );
};

export default InterpretingModals;
