"use client";
//TODO : Refactor suspense 
import { Suspense } from "react";

import { RootStyleProvider } from "@/config/config-mui";
import ModalLayer from "@/components/Modal/ModalLayer";
import PageLoading from "@/components/Loading/PageLoading";
import ToastSnackBar from "@/components/Toast";
import { Stack } from "@mui/material";
import VerticalMenu from "../Menus/VerticalMenu";


export default function Configuration({ children }: { children: React.ReactNode }) {
  return (
    <Suspense>
      <RootStyleProvider>
        <Stack direction="row" width="100%">
          <VerticalMenu />
          <Stack width="100%" alignItems={"center"}>
            <ToastSnackBar />
            <PageLoading />
            <ModalLayer />
            {children}
          </Stack>
        </Stack>
      </RootStyleProvider>
    </Suspense>
  );
}
