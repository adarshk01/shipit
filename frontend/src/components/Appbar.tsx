import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import {
  useGitUser,
  useLoadingState,
  useReposState,
  useAuthStore,
} from "../store/store";
import axios from "axios";

export function Appbar() {
  // const {
  //   loginWithRedirect,
  //   user,
  //   isLoading,
  //   getAccessTokenSilently,
  //   isAuthenticated,
  // } = useAuth0();

  const {
    loginWithRedirect,
    getAccessTokenSilently,
    logout: auth0Logout,
  } = useAuth0();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);
  console.log(user);
  const repoStateSet = useReposState((state) => state.reposStateSet);

  useEffect(() => {
    const callbackend = async () => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${import.meta.env.VITE_AUTH0_API_AUDIENCE}`,
        },
      });

      const res = await axios.get("http://localhost:3000/api/v1/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          User: JSON.stringify(user),
        },
      });

      console.log(res.data);
    };

    const gitTokenBackend = async () => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: `${import.meta.env.VITE_AUTH0_API_AUDIENCE}`,
        },
      });
      // console.log("here is your token ", token);
      const res = await axios.get("http://localhost:3000/api/v1/repos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      repoStateSet(res.data);
      console.log(res.data);
    };

    if (isAuthenticated) {
      callbackend();
      gitTokenBackend();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      async () => {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: `${import.meta.env.VITE_AUTH0_API_AUDIENCE}`,
          },
        });
      };
    }
  }, [isAuthenticated]);

  return (
    <div className="flex justify-between items-center text-white">
      <div>ShipIt🚀</div>
      <div className="flex gap-5 text-xs">
        <div className="cursor-pointer">Home</div>
        <div className="cursor-pointer">Products</div>
        <div className="cursor-pointer">Resources</div>
        <div className="cursor-pointer">Pricing</div>
      </div>
      {isAuthenticated ? (
        <div className="flex items-center ">
          {" "}
          {user ? (
            <img
              src={user.picture}
              height={32}
              width={32}
              alt=""
              className="rounded-full cursor-pointer "
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        <div
          onClick={() => {
            loginWithRedirect({
              appState: {
                returnTo: "/dashboard",
              },
            });
          }}
          className="bg-white/20 p-1 text-xs px-3 rounded-full cursor-pointer hover:bg-white/30 transition duration-200 ease-in"
        >
          Log in
        </div>
      )}
    </div>
  );
}
