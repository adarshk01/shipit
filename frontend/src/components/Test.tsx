import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface fileProps {
  userName: string;
  icon: string;
  projectName: string;
  date: string;
  msg: string;
  commitMap: {};
  branch: string;
  domainUrl: string;
  userId: any;
  githubUrl: string;
  deploymentStatus: string;
  createdAt: any;
}

export function Test({
  userName,
  icon,
  date,
  msg,
  commitMap,
  projectName,
  branch,
  domainUrl,
  userId,
  githubUrl,
  deploymentStatus,
  createdAt,
}: fileProps) {
  const [imgGlow, setImgGlow] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-48 w-90 relative ">
      <div
        className={`absolute h-full w-full overflow-hidden rounded-3xl 
          
        `}
      >
        <div
          className={` h-full w-full  absolute top-20 left-20 transition-all duration-300 ease-in-out blur-lg  ${
            imgGlow ? "brightness-120 " : "brightness-100"
          } `}
        >
          {/* right side*/}
          <img src={icon} className="w-50 rotate-30 contrast-125 left-30 top-5 absolute   " />
          <img src={icon} className="w-25 top-15  contrast-125 absolute left-30   " />
          <img src={icon} className="w-50 rotate-180 left-10 top-15 contrast-125 absolute   " />
          {/* left side*/}
          <img src={icon} className="w-50 rotate-45 contrast-125 -left-15 top-5 absolute   " />
          <img src={icon} className="w-25 top-10 rotate-180 contrast-125 absolute -left-20   " />
          <img src={icon} className="w-50 rotate-180 -left-40 top-10 contrast-125 absolute   " />
        </div>
      </div>

      <div className="absolute h-full w-full ">
        <div
          className={`h-full w-full absolute top-9 left-45 transition-all duration-700 ease-in-out blur-xl   ${
            imgGlow ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* right*/}
          <div
            className="absolute  h-45 w-45    top-0  left-5"
            style={{
              clipPath: "inset(20% 10% 10% 20%)",
            }}
          >
            <img
              src={icon}
              className={`w-45 rotate-0 absolute brightness-120 contrast-125 -left-8 top-2 opacity-40  `}
            />
            <img
              src={icon}
              className={`w-45 rotate-z-180 absolute brightness-120 contrast-125 top-5 opacity-40 left-15 `}
            />
          </div>
          {/* mid*/}
          <div
            className="absolute  h-45 w-45    top-0  -left-28"
            style={{
              clipPath: "inset(20% 10% 10% 20%)",
            }}
          >
            <img
              src={icon}
              className={`w-45 rotate-0 absolute brightness-120 contrast-125 -left-8 top-2 opacity-40  `}
            />
            <img
              src={icon}
              className={`w-45 rotate-z-180 absolute brightness-120 contrast-125 top-5 opacity-40 left-15 `}
            />
          </div>
          {/* left*/}
          <div
            className="absolute  h-45 w-45    top-0  -left-53"
            style={{
              clipPath: "inset(20% 10% 10% 20%)",
            }}
          >
            <img
              src={icon}
              className={`w-45 rotate-0 absolute brightness-120 contrast-125 -left-8 top-2 opacity-40  `}
            />
            <img
              src={icon}
              className={`w-45 rotate-z-180 absolute brightness-120 contrast-125 top-5 opacity-40 left-15 `}
            />
          </div>
        </div>
      </div>

      <div
        className="absolute h-full w-full  cursor-pointer "
        onMouseEnter={() => {
          setImgGlow(true);
        }}
        onMouseLeave={() => {
          setImgGlow(false);
        }}
      >
        {/* <div
          className="absolute     bg-white/20  h-full w-full  "
          style={{
            clipPath:
              "path('M 0,20 A 20,20 0,0,1 20,0 L 340,0 A 20,20 0,0,1 360,20 L 360,190 L 220,180 L 250,220 L 20,220 A 20,20 0,0,1 0,200 L 0,20 Z')",
          }}
        > */}
        <div
          className={`absolute   transition-all duration-700 ease-in-out h-full w-full p-5   ${
            imgGlow ? "bg-zinc-800" : "bg-zinc-900"
          }`}
          style={{
            clipPath:
              "path('M 0,20 A 20,20 0,0,1 20,0 L 340,0 A 20,20 0,0,1 360,20 L 360,165 A 20,20 0,0,1 345,180 L 15,180 A 20,20 0,0,1  0,165 L 0,20 Z')",
          }}
          onClick={() => {
            navigate("/dashboard/project", {
              state: {
                project: {
                  userId,
                  projectName,
                  githubUrl,
                  domainUrl,
                  deploymentStatus,
                  branch,
                  createdAt,
                },
                date: date,
              },
            });
          }}
        >
          <div className="flex gap-3 items-center">
            <div className="h-8 w-8">
              {icon ? (
                <img
                  src={icon}
                  height={20}
                  width={20}
                  className="flex justify-center items-center h-full w-full"
                />
              ) : (
                <div className="bg-neutral-800 h-8 w-8 rounded-full">
                  <span className="flex justify-center items-center h-full text-white/70 font-bold">
                    ?
                  </span>
                </div>
              )}
            </div>
            <div>
              <div className="text-white font-semibold text-sm">{projectName}</div>
              <div className="text-white/60 mt-1 text-sm">{domainUrl}</div>
            </div>
          </div>
          <div className="flex bg-neutral-700/60 mt-2.5 p-0.5 px-2 rounded-full items-center w-fit h-fit py-1 gap-2">
            <svg
              x="0px"
              y="0px"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              className="stroke-white fill-white"
            >
              <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
            </svg>
            <div className="text-white text-xs font-semibold">
              {userName}/{projectName}
            </div>
          </div>
          <div className="text-white mt-2 font-normal">{commitMap ? msg : ""}</div>
          <div className="text-white/60 mt-1 text-sm font-light  ">
            <span className="flex font-medium">
              {date ? date : ""} on {branch}
            </span>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

{
  /*
   "path('M 0,20 A 20,20 0,0,1 20,0 L 340,0 A 20,20 0,0,1 360,20 L 360,160 A 20,20 0,0,1 340,180 L 230,180 A 10,10 0,0,0 220,190 L 220,200 A 20,20 0,0,1 200,220 L 20,220 A 20,20 0,0,1 0,200 L 0,0 Z')",
 
  <div className="absolute h-40 w-30 bg-gray-100 rounded-lg shadow-md shadow-neutral-800/50 rotate-20 px-2 left-35 top-10">
            <div className="h-1 w-full bg-stone-500/10 mt-4 rounded-full"></div>
            <div className="h-1 w-[75%] bg-stone-500/10 mt-2 rounded-full"></div>
            <div className="h-1 w-full bg-stone-500/10 mt-8 rounded-full"></div>
            <div className="h-1 w-[75%] bg-stone-500/10 mt-2 rounded-full"></div>
          </div>
          <div className="absolute h-40 w-30 bg-gray-100 rounded-lg shadow-md shadow-neutral-800/50 rotate-10 left-25 top-6 px-2">
            <div className="h-1 w-full bg-stone-500/10 mt-4 rounded-full"></div>
            <div className="h-1 w-[75%] bg-stone-500/10 mt-2 rounded-full"></div>
            <div className="h-1 w-full bg-stone-500/10 mt-8 rounded-full"></div>
            <div className="h-1 w-[75%] bg-stone-500/10 mt-2 rounded-full"></div>
          </div>
          <div className="absolute h-40 w-30 bg-gray-100 rounded-lg shadow-md shadow-neutral-800/50 -rotate-10 px-2 left-15 top-9">
            <div className="h-1 w-full bg-stone-500/10 mt-4 rounded-full"></div>
            <div className="h-1 w-[75%] bg-stone-500/10 mt-2 rounded-full"></div>
            <div className="h-1 w-full bg-stone-500/10 mt-8 rounded-full"></div>
            <div className="h-1 w-[75%] bg-stone-500/10 mt-2 rounded-full"></div>
          </div> */
}

//prev folder comp
{
  /* <div className="h-55 w-90 bg-neutral-900  rounded-4xl  border-t border-r  border-neutral-300/20 p-1.5 relative shadow-2xl shadow-neutral-950">
        <div className=" relative    h-full w-full rounded-3xl overflow-hidden  ">
          <img
            src={icon}
            className="brightness-125   rotate-30 contrast-125 left-20 -top-10 absolute blur-2xl "
            width={"300px"}
          />
          <img src={icon} className=" brightness-125 -top-10  contrast-125 absolute w-100 blur-2xl" />
          <img
            src={icon}
            className=" brightness-125   rotate-160  -left-25 -top-25 contrast-125 absolute blur-2xl "
            width={"300px"}
          />
          <div className="absolute flex justify-center items-center h-full w-full"></div>
  
          <div className="relative h-full w-full rounded-3xl">
            <div
              className="bg-neutral-900 h-full w-full absolute top-17 p-3 text-white"
              style={{
                clipPath:
                  "path('M 0,15 A 15,15 0,0,1 15,5 L 105,5 A 30,30 0,0,1 115,10 L 135,25 A 30,30 0,0,0 145,30 L 335,30 A 15,15 0,0,1 350,40 L 350,160 L 0,160 L 0,5 Z')",
              }}
            >
              {" "}
              <div className="flex gap-2">
                <img src={icon} alt="" height={15} width={15} />
                <div className="text-white font-semibold text-sm">{projectName}</div>
              </div>
              <div className="text-white/60 mt-1 text-sm">{domainUrl}</div>
              <div className="flex bg-neutral-700/60 mt-2.5 p-0.5 px-2 rounded-full items-center w-fit h-fit py-1 gap-2">
                <svg
                  x="0px"
                  y="0px"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  className="stroke-white fill-white"
                >
                  <path d="M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"></path>
                </svg>
                <div className="text-white text-xs font-semibold">
                  {userName}/{projectName}
                </div>
              </div>
              <div className="text-white mt-2 font-normal text-sm">{commitMap ? msg : ""}</div>
              <div className="text-white/60 mt-0.5 text-sm font-light  ">
                <span className="flex font-medium text-sm">
                  {date ? date : ""} on {branch}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
