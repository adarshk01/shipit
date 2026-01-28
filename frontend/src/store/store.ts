import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GitUserStore {
  user: any;
  gitUserSet: (newUser: any) => void;
}

export const useGitUser = create<GitUserStore>((set) => ({
  user: {},
  gitUserSet: (newUser: any) => {
    set(() => ({
      user: newUser,
    }));
  },
}));

//---------------------------------------------------

interface isLoadingState {
  loadingState: boolean;
  loadingStateSet: (newVal: any) => void;
}

export const useLoadingState = create<isLoadingState>((set) => ({
  loadingState: false,
  loadingStateSet: (newVal: any) => {
    set(() => ({
      loadingState: newVal,
    }));
  },
}));

//------------------------------------------------------

interface repoState {
  repos: any;
  reposStateSet: (newVal: any) => void;
}

export const useReposState = create<repoState>((set) => ({
  repos: [],
  reposStateSet: (newVal: any) => {
    set(() => ({
      repos: newVal,
    }));
  },
}));

//------------------------------------------------------

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  // isLoading: boolean;

  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
