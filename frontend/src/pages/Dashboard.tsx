import { useNavigate } from "react-router-dom";
import { useAuthStore, useProjectDetail, useReposState, userProjectList } from "../store/store";
import { dateConfig } from "../utils/date";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useShallow } from "zustand/react/shallow";
import shipIt from "../../public/shipIt.svg";
import { Test } from "../components/Test";

export function Dashboard() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const navigate = useNavigate();
  const setProjectDetail = useProjectDetail((state) => state.setProjectDetail);
  const { projectList, fetchProjectList }: any = userProjectList(
    useShallow((state) => ({
      projectList: state.projectList,
      fetchProjectList: state.fetchProjectList,
    }))
  );
  const { user, setUserId, userId }: any = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      setUserId: state.setUserId,
      userId: state.userID,
    }))
  );
  const { repos, fetchRepo }: any = useReposState(
    useShallow((state) => ({ repos: state.repos, fetchRepo: state.fetchRepo }))
  );
  const [commitMap, setCommitMap] = useState<Record<string, any>>({});

  useEffect(() => {
    if (user || isAuthenticated) {
      const run = async () => {
        const id = await setUserId(getAccessTokenSilently, user);
        fetchRepo(getAccessTokenSilently);
        if (id) {
          fetchProjectList(getAccessTokenSilently, id);
        }
      };
      run();
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const fetchCommit = async () => {
      const map: any = {};

      for (const x of projectList.projectList || []) {
        const repo = repos.find((r: any) => r.name === x.projectName);

        const url = repo?.commits_url?.replace("{/sha}", "?per_page=1");

        if (url) {
          try {
            const res = await axios.get(url);
            map[x.projectName] = res.data[0].commit;
          } catch (e) {
            console.log(e);
          }
        }
      }

      setCommitMap(map);
    };
    fetchCommit();
  }, [repos, projectList]);

  return (
    <div className="bg-[#0e100f]  min-h-screen ">
      <div className="flex justify-between items-center">
        <div className="flex gap-2  items-center text-white  p-3 mb-1">
          <div
            className="cursor-pointer flex gap-2 items-center"
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={shipIt} alt="" className="h-5 w-5" />
            <span>ShipIt</span>
          </div>
          <div className="text-neutral-700/70 text-lg">/</div>
          <div className="text-md font-semibold">{user ? user.nickname : ""}'s projects</div>
        </div>
        <div className="flex  items-center">
          <div className="border-2 border-slate-300/50 rounded-full  mr-5">
            <img
              src={user ? user.picture : ""}
              height={32}
              width={32}
              alt=""
              className="rounded-full cursor-pointer "
            />
          </div>
        </div>
      </div>
      <div className=" border-b  w-full border-white/10"></div>
      <div className="  grid grid-cols-12  gap-10 p-5 bg-[#0e100f]">
        <div className="col-span-3 flex flex-col gap-3 ">
          <div className="text-white/85 mb-2 pl-2">Import your repos</div>
          <div
            className=" border border-neutral-600/30 max-h-122 rounded-lg overflow-y-auto bg-[#111314]
           scrollbar scrollbar-thumb-zinc-400 rounded-scrollbar no-scroll-buttons"
          >
            {repos.map((x: any) => {
              const date = dateConfig(x.updated_at);

              return (
                <div
                  key={x.id}
                  className="p-4 border-b border-neutral-600/30 text-white flex justify-between font-semibold"
                >
                  <div className="flex items-center gap-2 text-sm">
                    <div>{x.name.length >= 20 ? x.name.substring(0, 15) + "..." : x.name}</div>
                    <div className="  flex items-center text-white/40  ">· {date}</div>
                  </div>
                  <div
                    className=" text-sm bg-white h-max-5 text-black p-1 flex flex-col justify-center  font-semibold
                   rounded-lg px-2 cursor-pointer hover:bg-white/70 transition duration-200 ease-in-out"
                    onClick={() => {
                      setProjectDetail({
                        id: x.id,
                        userId: userId,
                        name: x.name,
                        fullName: x.full_name,
                        branch: x.default_branch,
                        fileStruct: x.contents_url,
                        git: x.git_url.substring(6),
                        url: x.url,
                        destinationFolder: `${x.name}-${x.owner.login}`,
                      });
                      const name = x.name + "-" + x.owner.login;
                      navigate(
                        `/dashboard/import?name=${encodeURIComponent(name)}&id=${x.id}&project=${
                          x.name
                        }&owner=${x.owner.login}&fullName=${x.full_name}&branch=${x.default_branch}`
                      );
                    }}
                  >
                    Import
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-9 flex flex-col gap-3 ">
          <div className="text-white/85   pl-2">Your Projects</div>
          <div className=" rounded-lg">
            <div className="mt-3 flex flex-wrap  gap-5  ">
              {commitMap &&
                projectList.projectList?.map((x: any, key: any) => {
                  const len = x.domainUrl.length || 9;
                  const proj = commitMap?.[x.projectName] || "";
                  const commit = proj?.author?.date || "2026-03-28T06:33:31.933Z";
                  const msg = proj?.message || "";
                  const date = dateConfig(commit);
                  const icon = x?.icon;
                  return (
                    <div key={key}>
                      <Test
                        icon={icon}
                        date={date}
                        msg={msg}
                        commitMap={commitMap}
                        userName={user.nickname}
                        projectName={x.projectName}
                        branch={x.branch}
                        deploymentStatus={x.deploymentStatus}
                        userId={x.userId}
                        githubUrl={x.git_url}
                        createdAt={x.createdAt}
                        domainUrl={x.domainUrl.substring(8, len - 1)}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
