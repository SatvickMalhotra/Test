import { create } from 'zustand';

interface AdminState {
  isAdmin: boolean;
  clickCount: number;
  profilePicture: string;
  setIsAdmin: (value: boolean) => void;
  incrementClickCount: () => void;
  resetClickCount: () => void;
  setProfilePicture: (url: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  isAdmin: false,
  clickCount: 0,
  profilePicture: "https://images.unsplash.com/photo-1702687210252-f843218d152d",
  setIsAdmin: (value) => set({ isAdmin: value }),
  incrementClickCount: () => set((state) => ({ clickCount: state.clickCount + 1 })),
  resetClickCount: () => set({ clickCount: 0 }),
  setProfilePicture: (url) => set({ profilePicture: url }),
}));