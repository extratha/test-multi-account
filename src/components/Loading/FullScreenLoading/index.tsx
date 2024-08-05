"use client";

import { alpha, Stack, styled } from "@mui/material";
import Image from "next/image";

import { ImageLoadingStack } from "@/assets";

const Modal = styled(Stack)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: theme.zIndex.modal,
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: alpha(theme.palette.common.black, 0.5),
  backdropFilter: "blur(8px)",
}));

const ImageSection = styled(Stack)({
  outline: "none",
});

const FullScreenLoading = () => {
  return (
    <Modal data-testid="full-screen-loading">
      <ImageSection>
        <Image
          data-testid="full-screen-loading-image"
          alt="full-screen-loading-image"
          width={100}
          height={100}
          src={ImageLoadingStack}
        />
      </ImageSection>
    </Modal>
  );
};

export default FullScreenLoading;
