import { useEffect, useRef, useState } from "react";
import vite from "../../public/vite.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useProjectDetail } from "../store/store";
import axios from "axios";

export function Import() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const projectDetail = useProjectDetail((state) => state.projectDetail);
  const clearProjectDetail = useProjectDetail((state) => state.clearProjectDetail);
  const [searchParams] = useSearchParams();
  // const name = searchParams.get("name");
  const fullName = searchParams.get("fullName");
  const branch = searchParams.get("branch");
  // const project = searchParams.get("project");
  // const [platform, setPlatform] = useState<string>(projectDetail.name);
  const [envArr, setEnvArr] = useState<number[]>([0]);
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");
  const [envVars, setEnvVars] = useState<{ id: number; key: string; value: string }[]>([
    {
      id: 0,
      key: "",
      value: "",
    },
  ]);

  const handleAddEnvVar = () => {
    setEnvVars((prev) => [
      ...prev,
      {
        id: prev[prev.length - 1].id + 1,
        key: "",
        value: "",
      },
    ]);
  };
  const handleRemoveEnvVar = () => {
    if (envVars.length <= 1) return;
    setEnvVars((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (ref.current) {
      setHeight(open ? `${ref.current?.scrollHeight}px` : "0px");
    }
  }, [open, envArr]);

  const handleRemove = () => {
    if (envArr.length <= 1) return;

    if (ref.current) {
      const rows = ref.current.querySelectorAll(".env-row");
      const lastRow = rows[rows.length - 1] as HTMLElement;
      const shrinkBy = lastRow ? lastRow.offsetHeight + 4 : 0;

      setHeight(`${ref.current.scrollHeight - shrinkBy}px`);
    }
    setTimeout(() => {
      setEnvArr((prev) => prev.slice(0, -1));
      handleRemoveEnvVar();
    }, 400);
  };

  return (
    <div className="min-h-screen   flex justify-center items-center bg-neutral-900  ">
      <div className="relative">
        <div className="absolute h-50 w-70 bg-linear-to-b from-blue-300/15 to-transparent blur-3xl -top-70 left-50 z-30 pointer-events-none"></div>
      </div>
      <div className="min-h-108 h-fit w-125 bg-[#1c1d20] flex flex-col self-start mt-25 rounded-3xl border-t border-blue-300/30 overflow-hidden relative">
        <div className="p-7 ">
          <div className="flex justify-between">
            <div className="font-semibold text-white text-2xl">New Project</div>
            <div
              onClick={() => {
                clearProjectDetail();
                navigate("/dashboard");
              }}
            >
              <svg
                fill=""
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="white"
                className="size-7 opacity-70 cursor-pointer hover:bg-slate-700/70 rounded-full p-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <div className="mt-2 bg-[#2a2e3b] p-2.5 rounded-lg w-[70%]  ">
            <span className="text-white/50 text-xs font-semibold">Importing from GitHub</span>
            <div className="flex justify-between  mt-0.5 items-center gap-2">
              <div className="flex gap-2">
                {" "}
                <svg
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="stroke-white fill-white"
                >
                  <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
                </svg>
                <div className="text-white flex-auto flex-col justify-center text-sm font-medium">
                  {fullName
                    ? fullName.length >= 20
                      ? fullName.substring(0, 15) + "..."
                      : fullName
                    : ""}
                </div>
              </div>
              <div className="flex gap-1.5 items-center pl-2">
                <svg width="12%" height="12%" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 3V15M6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21C7.65685 21 9 19.6569 9 18M6 15C7.65685 15 9 16.3431 9 18M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9ZM18 9C18 11.3869 17.0518 13.6761 15.364 15.364C13.6761 17.0518 11.3869 18 9 18"
                    stroke="#989a9c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-white/40 text-sm font-semibold">{branch ? branch : ""}</div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div className="text-white text-xs font-semibold z-30">
              Project Name: {projectDetail.name}
            </div>
            {/* <div className="mt-2 w-[50%]">
              <input
                type="text"
                placeholder="Enter project name"
                className="border border-neutral-600/50 rounded-md text-white  p-1.5 w-full  "
                onChange={(e) => {
                  setPlatform(e.target.value);
                }}
                value={platform}
              />
            </div> */}
          </div>
          <hr className="mt-3 text-white/10 h-0.5" />
          <div>
            <span className="text-xs font-semibold text-white">Application Preset</span>
            <div className="h-7 w-full bg-gray-500/10 rounded-lg mt-1 px-2.5 text-white text-sm border border-white/20 flex items-center justify-between cursor-pointer">
              <span className="flex   items-center gap-1 h-full">
                <img src={vite} alt="" className=" h-3.5 w-3.5" />
                <div>
                  <span>vite</span>
                  <span className="text-white/70 text-xs "> (default)</span>
                </div>
              </span>

              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-3.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-3 flex gap-2 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="size-4.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
            <div className="text-white text-xs flex gap-1">
              Root Directory
              <span className="text-white/70">
                ( please select appropriate frontend folder to deploy )
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-full h-7  bg-gray-400/10 rounded-md text-white px-2.5 border border-white/20 cursor-not-allowed">
              . /
            </div>
            <div className="bg-gray-950 rounded-md w-fit h-7 text-white  flex items-center text-sm font-semibold px-3 border border-white/20 cursor-pointer ">
              Edit
            </div>
          </div>
          <div className="mt-3 z-50 mb-3">
            <div
              className={`text-white text-sm border border-neutral-600/70 p-2 rounded-md  items-start  overflow-hidden   
              `}
            >
              <div
                className={`flex gap-1 items-center cursor-pointer`}
                onClick={() => setOpen(!open)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className={`size-4 transition-transform duration-300 ease-in-out ${
                    open ? "rotate-90" : ""
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
                <span>Environment Variables</span>
              </div>

              <div
                ref={ref}
                style={{
                  maxHeight: height,
                }}
                className={`transition-all duration-700 ease-in-out overflow-hidden text-xs 
                  
                `}
              >
                <div className="flex">
                  <div className="w-[50%]  px-1">Key</div>
                  <div className=" px-1">Value</div>
                </div>

                {envVars.map((i, index) => {
                  return (
                    <div
                      className="env-row flex gap-1.5 mt-1 px-0.5 transition-all duration-700 ease-in-out"
                      key={index}
                    >
                      <input
                        type="text"
                        placeholder={`EXAMPLE_NAME ${index}`}
                        value={i.key}
                        className="border border-neutral-600/50 rounded-md text-white  p-1.5 w-[50%] text-xs"
                        onChange={(e) => {
                          const updated = [...envVars];
                          updated[index].key = e.target.value;
                          setEnvVars(updated);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="EXAMPLE_VALUE"
                        value={i.value}
                        onChange={(e) => {
                          const updated = [...envVars];
                          updated[index].value = e.target.value;
                          setEnvVars(updated);
                        }}
                        className="border border-neutral-600/50 rounded-md text-white  p-1.5 w-[50%] text-xs "
                      />
                    </div>
                  );
                })}

                <div className="flex gap-5 mt-2">
                  <div
                    className=" border border-neutral-600/70 bg-neutral-700/30 rounded-md w-fit p-1 font-semibold text-xs hover:bg-neutral-700/60 
                transition duration-300 ease-in-out cursor-pointer"
                    onClick={() => {
                      setEnvArr((prev) => [...prev, prev[prev.length - 1] + 1]);
                      handleAddEnvVar();
                    }}
                  >
                    + Add More
                  </div>
                  <div
                    className="border border-neutral-600/70 bg-neutral-700/30 rounded-md w-fit p-1 font-semibold text-xs hover:bg-neutral-700/60 
                transition duration-300 ease-in-out cursor-pointer"
                    onClick={handleRemove}
                  >
                    Remove
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative mt-auto ">
          <div className=" absolute  -top-[15%] flex justify-center w-full z-40">
            <div
              className="  text-white/85 bg-linear-to-br from-sky-300/60  via-blue-700 via-20% to-sky-400 to-170% 
            p-1.5 px-8 rounded-xl border border-white/70   shadow-[0_0_30px_1px_#4657a6,0_0_10px_rgb(184,205,255)_inset] cursor-pointer"
              onClick={async () => {
                const res = await axios.post(`${import.meta.env.VITE_POST_QUEUE}`, {
                  id: projectDetail.id,
                  userId: projectDetail.userId,
                  name: projectDetail.name,
                  fullName: projectDetail.fullName,
                  branch: projectDetail.branch,
                  destinationFolder: projectDetail.destinationFolder,
                  git: projectDetail.git,
                  envVar: envVars,
                });
                console.log(res.data);
              }}
            >
              <div className="font-semibold text-lg">Deploy</div>
            </div>
          </div>
          <div className=" relative z-10 bg-linear-to-t from-blue-950/28  from-40% to-transparent h-40 -top-40 w-full pointer-events-none  -mb-40 "></div>
          <div className=" overflow-hidden  ">
            <div
              className="h-px"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to right, rgb(44, 53, 66) 0px, rgb(44, 53, 66) 7px, transparent 10px, transparent 15px)",
              }}
            ></div>
            {/* button down here*/}

            <div className="  blur-xl  relative  h-full  bg-blue-600/20 z-10">
              <div
                className="h-35 w-full bg-linear-to-t from-white from-15% to-[#3959e9] to-30%    "
                style={{
                  clipPath:
                    "polygon(0 10%, 30% 25%, 45% 20%, 85% 46%, 100% 20%, 100% 100%, 0 100%)",
                }}
              ></div>
              <div
                className="bg-indigo-200 h-20 w-full absolute top-17"
                style={{
                  clipPath:
                    "polygon(0 10%, 30% 25%, 45% 20%, 85% 46%, 100% 50%, 100% 100%, 0 100%)",
                }}
              ></div>
              <div
                className="bg-blue-600/40 h-20 w-full absolute top-20"
                style={{
                  clipPath: "polygon(40% 100%, 70% 30%, 90% 60%, 100% 40%, 100% 100% )",
                }}
              ></div>
              <div
                className="bg-white h-20 w-full absolute top-20  "
                style={{
                  clipPath: "polygon(0 10%, 30% 25%, 45% 0, 55% 46%, 60% 80%, 100% 100%, 0 100%)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ${open ? " max-h-125  opacity-100 mt-3" : "max-h-0  opacity-0"}
