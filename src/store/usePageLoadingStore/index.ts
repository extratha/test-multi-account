import { create } from 'zustand';

type PageLoadingState = {
  isPageLoading: boolean;
  setPageLoading: (loading: boolean) => void;
};

const usePageLoadingStore = create<PageLoadingState>((set) => ({
  isPageLoading: false,
  setPageLoading: (loading: boolean) => set(() => ({ isPageLoading: loading })),
}));

export default usePageLoadingStore;
