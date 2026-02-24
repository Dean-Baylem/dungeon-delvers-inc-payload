import { createStore } from 'zustand';
import { loginUser } from '@/lib/auth/login';
import { logoutUser } from '@/lib/auth/logout';
import { authCheck } from '@/lib/auth/authCheck';

export type User = {
  id: string;
  email: string;
  collection: string;
  token?: string;
};

export type AuthStoreState = {
  user: User | null;
};

export type AuthStoreActions = {
  handleLogin: (
    credentials: { username: string; password: string },
    collection: string,
  ) => Promise<void>;
  handleLogout: (collection: string) => void;
  handleAuthStatus: (collection: string) => void;
};

export type AuthStore = AuthStoreState & AuthStoreActions;

export const defaultInitState: AuthStoreState = {
  user: null,
};

export const createAuthStore = (initState: AuthStoreState = defaultInitState) => {
  return createStore<AuthStore>()((set) => ({
    ...initState,
    handleLogin: async (credentials, collection) => {
      const user = await loginUser(credentials, collection);
      set({ user });
    },
    handleLogout: async (collection) => {
      const success = await logoutUser(collection);
      set({ user: null });
    },
    handleAuthStatus: async (collection) => {
      const status = await authCheck(collection);
      if (status) {
        set({ user: status });
      }
    },
  }));
};
