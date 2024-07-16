"use client";

import { Container, Modal, Paper, styled } from "@mui/material";

import useModal from "@/store/modal";

const StyledModal = styled(Modal)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  outline: 0,
  backdropFilter: "blur(8px)",
  "& :focus-visible": {
    outline: 0,
  },
}));

const StyledPaper = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "24px",
  margin: "0 16px",
}));

const ModalLayer = () => {
  const { modal, closeModal } = useModal();
  const ModalContent = modal.content;

  return (
    <>
      {modal.isVisible && (
        <StyledModal disableEnforceFocus open>
          <Container maxWidth="sm" disableGutters>
            {modal.isInPaper ? (
              <StyledPaper elevation={3}>
                <ModalContent closeModal={closeModal} />
              </StyledPaper>
            ) : (
              <ModalContent closeModal={closeModal} />
            )}
          </Container>
        </StyledModal>
      )}
    </>
  );
};

export default ModalLayer;
