import React from "react";
import { create } from "zustand";

type Modal = {
  isVisible: boolean;
  isInPaper: boolean;
  content: (props: BaseModalProps) => React.JSX.Element | null;
};

export type BaseModalProps = {
  closeModal: () => void;
};

export type ModalState = {
  modal: Modal;
  openModal: (getContent: (props: BaseModalProps) => React.JSX.Element, isInPaperProps?: boolean) => void;
  closeModal: () => void;
};

const modalDefault = { isVisible: false, isInPaper: true, content: () => null };

const useModal = create<ModalState>((set) => ({
  modal: modalDefault,
  openModal: (getContent, isInPaperProps) => {
    set(() => ({
      modal: { isVisible: true, isInPaper: isInPaperProps === undefined ? false : isInPaperProps, content: getContent },
    }));
  },
  closeModal: () => {
    set(() => ({ modal: modalDefault }));
  },
}));

export default useModal;
