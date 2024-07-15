"use client";
import { ImageLoadingStack } from "@/assets";
import { usePageLoadingStore } from "@/store";
import Backdrop from "@mui/material/Backdrop";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PageLoading = () => {
  const { isPageLoading, setPageLoading } = usePageLoadingStore();
  const pathname = usePathname();

  useEffect(() => {
    setPageLoading(false);
  }, [pathname]);

  return (
    <>
      {isPageLoading && (
        <Backdrop
          data-testid="backdrop-loading"
          sx={{
            zIndex: (theme) => theme.zIndex.tooltip + 1,
          }}
          open
        >
          <Image
            data-testid="img-loading-stack"
            alt=""
            src={ImageLoadingStack}
            style={{ width: "70px", height: "70px" }}
          ></Image>
        </Backdrop>
      )}
    </>
  );
};

export default PageLoading;
