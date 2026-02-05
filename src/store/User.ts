import { create } from "zustand";

interface User {
  userId: number;
  userLoginId: string;
}

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    userId: 0,
    userLoginId: "",
  },
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: { userId: 0, userLoginId: "" } }),
}));
