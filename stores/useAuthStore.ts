import { create } from 'zustand'

interface AuthState {
  authUser: AuthUser | null

  login: (email: string) => void

  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,

  login: (email) => set({ authUser: { email } }),

  logout: () => set({ authUser: null }),
}))
