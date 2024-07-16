"use client";

import { Modal as MuiModal, Stack, styled } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { ImageLoadingStack } from "@/assets";
import { usePageLoadingStore } from "@/store";

const Modal = styled(MuiModal)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const ImageSection = styled(Stack)({
  outline: "none",
});

const FullScreenLoading = () => {
  const { isPageLoading, setPageLoading } = usePageLoadingStore();
  const pathname = usePathname();

  useEffect(() => {
    setPageLoading(false);
  }, [pathname]);

  return (
    <>
      {isPageLoading && (
        <Modal data-testid="full-screen-loading" open>
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
      )}
    </>
  );
};

export default FullScreenLoading;
