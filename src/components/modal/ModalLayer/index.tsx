'use client';

import { Container, Modal, Paper, styled } from '@mui/material';

import useModal from '@/store/modal';

const StyledModal = styled(Modal)(() => ({
  position: 'fixed',
  zIndex: 999,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: 0,
  '& :focus-visible': {
    outline: 0,
  },
}));

const StyledPaper = styled(Paper)(() => ({
  padding: '24px',
  margin: '0 16px',
  borderRadius: 28,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
}));

const ModalLayer = () => {
  const { modal, closeModal } = useModal();
  const ModalContent = modal.content;

  return (
    <StyledModal disableEnforceFocus open={modal.isVisible}>
      <Container maxWidth="sm" disableGutters>
        <StyledPaper elevation={3}>
          <ModalContent closeModal={closeModal} />
        </StyledPaper>
      </Container>
    </StyledModal>
  );
};

export default ModalLayer;
