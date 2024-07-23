import { create } from "zustand";
import { persist } from "zustand/middleware";

import { LoginUserProfileData } from "@/types/model.api";

interface UserProfileState {
  data: LoginUserProfileData;
  isLoading: boolean;
  success: boolean;
  error: boolean;
  setUserProfile: (value: LoginUserProfileData) => void;
  resetUserProfile: () => void;
}

const initiateState: UserProfileState = {
  data: {
    ID: "",
    userID: "",
    email: "",
    prefix: "",
    firstName: "",
    lastName: "",
    isActive: false,
    corporate: "",
    createdAt: "",
    updatedAt: "",
  },
  isLoading: false,
  success: false,
  error: false,
  setUserProfile: () => {},
  resetUserProfile: () => {},
};

const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      ...initiateState,
      setUserProfile: (value) =>
        set((state) => ({
          data: { ...state.data, ...value },
        })),
      resetUserProfile: () =>
        set(() => ({
          data: initiateState.data,
          isLoading: false,
          success: false,
          error: false,
        })),
    }),
    {
      name: "userProfile",
    }
  )
);

export default useUserProfileStore;
