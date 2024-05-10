import React from 'react';
import { create } from 'zustand';

type Modal = {
  isVisible: boolean;
  content: (props: BaseModalProps) => React.JSX.Element | null;
};

export type BaseModalProps = {
  closeModal: () => void;
};

export type ModalState = {
  modal: Modal;
  openModal: (getContent: (props: BaseModalProps) => React.JSX.Element) => void;
  closeModal: () => void;
};

const modalDefault = { isVisible: false, content: () => null };

const useModal = create<ModalState>((set) => ({
  modal: modalDefault,
  openModal: (getContent) => {
    set(() => ({ modal: { isVisible: true, content: getContent } }));
  },
  closeModal: () => {
    set(() => ({ modal: modalDefault }));
  },
}));

export default useModal;
