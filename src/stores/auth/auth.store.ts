import { create, StateCreator } from 'zustand';
import type { AuthStatus, User } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { persist } from 'zustand/middleware';

interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'pending',
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: 'authorized', token, user });
    } catch (error) {
      console.log('error', error);
      set({ status: 'unauthorized', token: undefined, user: undefined });
      throw new Error('No se pudo autenticar');
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: 'authorized', token, user });
    } catch (error) {
      console.log('error', error);
      set({ status: 'unauthorized', token: undefined, user: undefined });
    }
  },

  logoutUser: () => {
    set({ status: 'unauthorized', token: undefined, user: undefined });
  },
});

export const useAuthStore = create<AuthState>()(persist(storeApi, { name: 'auth-storage' }));
