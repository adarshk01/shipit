import { create } from "zustand";

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

// interface toeknStore {
//   token: any;
//   tokenStateSet: (newVal: any) => void;
// }

// export const useTokenState = create<toeknStore>((set) => ({
//   token: {},
//   tokenStateSet: (newVal: any) => {
//     set(() => ({
//       token: newVal,
//     }));
//   },
// }));
