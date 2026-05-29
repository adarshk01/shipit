import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { dateConfig } from "../utils/date";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import shipIt from "../../public/shipIt.svg";
export function Project() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const location = useLocation();
  const project = location.state?.project;
  const date = dateConfig(project.createdAt);
  const [readyToDel, setReadyToDel] = useState(false);
  const [readyToGo, setReadyToGo] = useState(false);
  useEffect(() => {
    const main = async () => {
      try {
        console.log("Sending:", { id: project.userId, projectName: project.ProjectName });
        const token = await getAccessTokenSilently({
          authorizationParams: { audience: `${import.meta.env.VITE_AUTH0_API_AUDIENCE}` },
        });
        await axios.post(
          `${import.meta.env.VITE_DELETE_PROJ}`,
          {
            id: project.userId,
            projectName: project.projectName,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReadyToGo(true);
      } catch (e) {
        console.log(e);
      }
    };
    if (readyToDel) {
      main();
    }
  }, [readyToDel]);

  useEffect(() => {
    if (readyToGo) navigate("/dashboard");
  }, [readyToGo]);

  return (
    <div>
      <div className="border-b border-white/10  p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex gap-2 items-center text-white text-sm">
            <img src={shipIt} alt="" className="h-5 w-5" />
            <span>ShipIt</span>
          </div>
          <div className="text-neutral-700/70 text-lg">/</div>
          <div className="text-white text-sm font-semibold">{user?.nickname}</div>
        </div>
        <div className="text-white text-sm font-semibold">Overview</div>
        <div className="pr-2 flex gap-5 items-center">
          <div
            className="text-black/80 bg-white text-sm font-semibold px-1 py-1 rounded-lg cursor-pointer hover:bg-white/80 transition duration-300 ease-in-out"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </div>
          <img
            src={user?.picture}
            height={32}
            width={32}
            alt=""
            className="rounded-full cursor-pointer "
          />
        </div>
      </div>
      <div className="flex justify-center mt-5 ">
        <div className=" border border-neutral-500/40 rounded-xl  w-full  min-h-40 h-fit mx-50 text-white">
          <div className=" bg-[#111314] border-b border-neutral-500/40 pb-3 p-3 flex justify-between items-center ">
            <div className="text-sm font-semibold pl-2">Production Deployment</div>
            <div className="flex gap-5">
              <div
                className="text-sm font-semibold bg-black px-3.5 py-1.5 border border-white/20 rounded-lg cursor-pointer hover:bg-[#111314] transition duration-300 ease-in-out"
                onClick={() => {
                  window.open(project.githubUrl, "_blank");
                }}
              >
                <span className="flex gap-2 items-center">
                  <svg
                    x="0px"
                    y="0px"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    className="stroke-white fill-white"
                  >
                    <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
                  </svg>
                  <span>Repository</span>
                </span>
              </div>
              <div
                className="mr-2 px-2 bg-rose-500/80  rounded-md flex justify-center items-center cursor-pointer hover:bg-rose-500  transition duration-300 ease-in-out"
                onClick={() => {
                  setReadyToDel(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="p-4 flex gap-10">
            <div className={`  h-70 w-110  relative   `}>
              <img
                src={`https://shipits.in/${project?.projectName.toLowerCase()}-${
                  user?.nickname
                }/screenshot-${project?.projectName.toLowerCase()}-${user?.nickname}.png`}
                className="rounded-xl absolute"
              />

              <div className="absolute flex items-end w-full justify-end h-full p-2 font-semibold text-white/60">
                Preview
              </div>
            </div>
            <div>
              <div className="text-sm ">
                <div className="text-white/60">Deployment</div>
                <div className="mt-1 font-semibold">{project.projectName}</div>
              </div>
              <div className="text-sm mt-5">
                <div className="text-white/60">Domain</div>
                <a
                  className="mt-1 font-semibold cursor-pointer hover:underline  w-fit"
                  href={"https://" + project.domainUrl}
                  target="_blank"
                  onClick={() => {
                    console.log(project.domainUrl);
                  }}
                >
                  {project.domainUrl}
                </a>
              </div>
              <div className="flex gap-10 mt-5 text-sm">
                <div>
                  <div className="text-white/60">Status</div>
                  <div className="mt-1 font-semibold flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-teal-300"></div>
                    <div>{project.deploymentStatus}</div>
                  </div>
                </div>
                <div>
                  <div className="text-white/60">Created</div>
                  <div className="mt-1 font-semibold flex gap-2">
                    {date} by {user?.nickname}
                    <img
                      src={user?.picture}
                      height={20}
                      width={20}
                      alt=""
                      className="rounded-full cursor-pointer "
                    />
                  </div>
                </div>
              </div>
              <div className="text-sm mt-5">
                <div className="text-white/60">Source</div>
                <div className="flex gap-1 mt-2 font-semibold">
                  <svg width="5.5%" height="5.5%" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 3V15M6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21C7.65685 21 9 19.6569 9 18M6 15C7.65685 15 9 16.3431 9 18M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9ZM18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18"
                      stroke="#989a9c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{project.branch}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
