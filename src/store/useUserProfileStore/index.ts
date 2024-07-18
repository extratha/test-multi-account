import { UserProfile } from "@/types/model.ui";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProfileState {
  data: UserProfile;
  isLoading: boolean;
  success: boolean;
  error: boolean;
  setUserProfile: (value: UserProfile) => void;
  resetUserProfile: () => void;
}

const initiateState: UserProfileState = {
  data: {
    id: "",
    email: "",
    prefix: "",
    firstName: "",
    lastName: "",
    isActive: false,
    userId: "",
    passwordChanged: null,
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
          data: {
            ...state.data,
            id: value.id,
            email: value.email,
            prefix: value.prefix,
            firstName: value.firstName,
            lastName: value.lastName,
            isActive: value.isActive,
            userId: value.userId,
            passwordChanged: value.passwordChanged,
            createdAt: value.createdAt,
            updatedAt: value.updatedAt,
          },
        })),
      resetUserProfile: () =>
        set(() => ({
          data: {
            id: "",
            email: "",
            prefix: "",
            firstName: "",
            lastName: "",
            isActive: false,
            userId: "",
            passwordChanged: null,
            createdAt: "",
            updatedAt: "",
          },
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
