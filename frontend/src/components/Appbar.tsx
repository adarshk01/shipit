import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useGitUser, useLoadingState, useReposState } from "../store/store";
import axios from "axios";

export function Appbar() {
  const {
    loginWithRedirect,
    user,
    isLoading,
    getAccessTokenSilently,
    isAuthenticated,
  } = useAuth0();

  // const [gitUser, setGitUser] = useState({});

  const loadingStateSet = useLoadingState((state) => state.loadingStateSet);

  useEffect(() => {
    loadingStateSet(isLoading);
  }, [isLoading]);

  const gitUserSet = useGitUser((state) => state.gitUserSet);
  useEffect(() => {
    if (user) {
      gitUserSet(user);
      localStorage.setItem("user", user.nickname as string);
    }
  }, [user]);

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

    if (!isLoading && isAuthenticated) {
      callbackend();
      gitTokenBackend();
    }
  }, [isAuthenticated, isLoading]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      async () => {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: `${import.meta.env.VITE_AUTH0_API_AUDIENCE}`,
          },
        });
      };
    }
  }, [isAuthenticated, isLoading]);

  return (
    <div className="flex justify-between items-center text-white">
      <div>ShipIt🚀</div>
      <div className="flex gap-5 text-xs">
        <div className="cursor-pointer">Home</div>
        <div className="cursor-pointer">Products</div>
        <div className="cursor-pointer">Resources</div>
        <div className="cursor-pointer">Pricing</div>
      </div>
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
    </div>
  );
}
