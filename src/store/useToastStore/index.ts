import { create } from "zustand";

type Severity = "success" | "error" | "warning" | "info";
type VerticalPosition = "bottom" | "top";
type HorizontalPosition = "center" | "left" | "right";
type Icon = any | null;

type ToastState = {
  open: boolean;
  description: ToastDescription;

  setToastOpen: (open: boolean, description?: ToastDescription) => void;
};

type ToastDescription = {
  message: string;
  severity?: Severity;
  anchorOrigin?: {
    vertical: VerticalPosition;
    horizontal: HorizontalPosition;
  };
  icon?: Icon;
};

const defaultDescription: ToastDescription = {
  message: "",
  severity: "success",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  icon: null,
};

const useToastStore = create<ToastState>((set) => ({
  open: false,
  description: defaultDescription,
  setToastOpen: (open: boolean, description?: ToastDescription) =>
    set(() => ({ open, description: description ?? defaultDescription })),
}));

export default useToastStore;
