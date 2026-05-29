import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface repoState {
  repos: any;
  reposStateSet: (newVal: any) => void;
  fetchRepo: (getAccessTokenSilently: any) => void;
}

export const useReposState = create<repoState>((set) => ({
  repos: [],
  reposStateSet: (newVal: any) => {
    set(() => ({
      repos: newVal,
    }));
  },
  fetchRepo: async (getAccessTokenSilently: any) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${import.meta.env.VITE_AUTH0_API_AUDIENCE}`,
        },
      });
      const res = await axios.get(`${import.meta.env.VITE_GET_REPOS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ repos: res.data });
    } catch (e) {
      console.log(e);
    }
  },
}));

//------------------------------------------------------

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  userID: any | null;
  setUserId: (getAccessTokenSilently: any, user: any) => Promise<Number | string | null>;
  setUser: (user: any) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      userID: null,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      setUserId: async (getAccessTokenSilently, user) => {
        try {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: `${import.meta.env.VITE_AUTH0_API_AUDIENCE}`,
            },
          });
          if (user) {
            const res = await axios.get(`${import.meta.env.VITE_GET_USER}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {
                User: JSON.stringify(user),
              },
            });
            const id = res.data.user.id;
            set({ userID: id });
            return id;
          }
          return null;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
      clearUser: () =>
        set({
          user: null,
          isAuthenticated: false,
          userID: null,
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

//------------------------------------------------------

interface ProjectDetail {
  projectDetail: any | null;
  setProjectDetail: (detail: any) => void;
  clearProjectDetail: () => void;
}

export const useProjectDetail = create<ProjectDetail>((set) => ({
  projectDetail: {},
  setProjectDetail: (details: any) => {
    set({ projectDetail: details });
  },
  clearProjectDetail: () => {
    set({ projectDetail: null });
  },
}));

//-------------------------------------------------------
interface ProjectList {
  projectList: any;
  fetchProjectList: (getAccessTokenSilently: any, userId: any) => void;
}

export const userProjectList = create<ProjectList>((set) => ({
  projectList: [],

  fetchProjectList: async (getAccessTokenSilently: any, userId: any) => {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${import.meta.env.VITE_AUTH0_API_AUDIENCE}`,
        },
      });
      const res = await axios.get(`${import.meta.env.VITE_GET_PROJECTS}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: userId,
        },
      });

      set({ projectList: res.data });
    } catch (e) {
      console.log(e);
    }
  },
}));
