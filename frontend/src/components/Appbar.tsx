import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { useReposState, useAuthStore } from "../store/store";
import axios from "axios";
import shipIt from "../../public/shipIt.svg";
export function Appbar() {
  const { loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const { logout } = useAuth0();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAuthentication = useAuthStore((state) => state.clearUser);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  // const setUserId = useAuthStore((state) => state.setUserId);
  // const userId = useAuthStore((state) => state.userID);
  useEffect(() => {
    if (user) {
      setUser(user);
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
      console.log("look at this", user);
      if (user) {
        await axios.get(`${import.meta.env.VITE_GET_USER}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            User: JSON.stringify(user),
          },
        });
      }
    };

    async () => {
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
      repoStateSet(res.data);
    };

    if (isAuthenticated) {
      callbackend();
      // gitTokenBackend();
    }
  }, [isAuthenticated, user]);

  const [clicked, setClicked] = useState(false);

  return (
    <div className="flex justify-between items-center text-white">
      <div className="flex gap-2 items-center">
        <img src={shipIt} alt="" className="h-5 w-5" />
        <span className="font-semibold">ShipIt</span>
      </div>
      <div className="flex gap-5 text-xs">
        <div className="cursor-pointer">Home</div>
        <div className="cursor-pointer">Products</div>
        <div className="cursor-pointer">Resources</div>
        <div className="cursor-pointer">Pricing</div>
      </div>
      {isAuthenticated ? (
        <div className="relative">
          <div
            className="flex items-center bg-emerald-200/40 p-1 rounded-full "
            onClick={() => setClicked(!clicked)}
          >
            {" "}
            {user ? (
              <img
                src={user.picture}
                height={32}
                width={32}
                alt=""
                className="rounded-full cursor-pointer z-50"
              />
            ) : (
              ""
            )}
          </div>

          <svg
            className={`absolute text-xs z-50  h-12 w-20  scale-y-0 origin-top -left-6 mt-1.5 transition duration-300  ${
              clicked ? "scale-y-100" : " "
            }`}
            viewBox="0 0 80 48"
          >
            <path
              d="M 40,0 L 47,8 A 7,7 0,0,0 50,10 L 75,10 A 7,7 0,0,1 80,15 L 80,43 A 7,7 0,0,1 75,48 L 5,48 A 7,7 0,0,1 0,43 L 0,15 A 7,7 0,0,1 5,10 L 30,10 A 7,7 0,0,0 33,8 L 40,0 Z"
              stroke="#777e85"
              strokeWidth="1.2"
              fill="#0e100f"
            />

            <foreignObject x="0" y="10" width="80" height="36">
              {" "}
              <div className=" flex flex-col justify-end h-full w-full p-1 ">
                <div className="flex gap-0.5 hover:bg-red-500/70 rounded-md p-1  cursor-pointer transition duration-300">
                  <div className="flex justify-center items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                      <path d="M9 12h12l-3 -3" />
                      <path d="M18 15l3 -3" />
                    </svg>
                  </div>
                  <div
                    className="font-semibold"
                    onClick={() => {
                      logout({ logoutParams: { returnTo: window.location.origin } });
                      clearAuthentication();
                    }}
                  >
                    Logout
                  </div>
                </div>
              </div>{" "}
            </foreignObject>
          </svg>
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
