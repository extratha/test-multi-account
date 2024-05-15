import { create } from 'zustand';
import { persist } from 'zustand/middleware'
type UserProfileState = {
  "id": string,
  "email": string,
  "passwordChanged": boolean | null,
  "createdAt": string,
  "updatedAt": string;
  setUserProfile: (value: UserProfileState) => void
  resetUserProfile: () => void
};

const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set) => ({
      id: '',
      setId: (value: string) => set(() => ({ id: value })),
      email: '',
      setEmail: (value: string) => set(() => ({ email: value })),
      passwordChanged: null,
      setPasswordChanged: (value: boolean) => set(() => ({ passwordChanged: value })),
      createdAt: '',
      setCreatedAt: (value: string) => set(() => ({ createdAt: value })),
      updatedAt: '',
      setUpdatedAt: (value: string) => set(() => ({ updatedAt: value })),

      setUserProfile: (value: UserProfileState) => set(() => ({
        id: value.id,
        email: value.email,
        passwordChanged: value.passwordChanged,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt
      })),
      resetUserProfile: () => set(() => ({
        id: '',
        email: '',
        passwordChanged: null,
        createdAt: '',
        updatedAt: '',
      }))
    }), {
    name: 'userProfile'
  }
  )
);

export default useUserProfileStore;
