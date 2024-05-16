import { create } from 'zustand';
import { persist } from 'zustand/middleware'
import { UserProfile } from '@/types/auth'
interface UserProfileState extends UserProfile {
  setUserProfile: (value: UserProfile) => void
  resetUserProfile: () => void
}

const initiateState = {
  data: null,
  isLoading: false,
  success: false,
  error: false,
}

const useUserProfileStore = create<UserProfileState>()(
  persist(
    (set, get) => ({
      ...initiateState,
      id: '',
      email: '',
      passwordChanged: null,
      createdAt: '',
      updatedAt: '',

      setUserProfile: (value) => set(() => (
        {
          id: value.id,
          email: value.email,
          passwordChanged: value.passwordChanged,
          createdAt: value.createdAt,
          updatedAt: value.updatedAt
        }
      )),
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
