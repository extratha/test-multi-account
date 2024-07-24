import { create } from "zustand";

export interface PageLoadingStore {
  isPageLoading: boolean;
  setPageLoading: (loading: boolean) => void;
}

const usePageLoadingStore = create<PageLoadingStore>((set) => ({
  isPageLoading: false,
  setPageLoading: (loading: boolean) => set(() => ({ isPageLoading: loading })),
}));

export default usePageLoadingStore;
