import { useAuthStore, useGitUser, useReposState } from "../store/store";

export function Dashboard() {
  const gitUser = useGitUser((state) => state.user);
  console.log(gitUser);

  // console.log(gitUser.identities[0].access_token);
  const repos = useReposState((state) => state.repos);
  const user = useAuthStore((state) => state.user);
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="flex gap-2  items-center text-white  p-5 mb-1">
          <div>ShipIt🚀</div>
          <div className="text-neutral-700/70 text-lg">/</div>
          <div className="text-md font-semibold">
            {user.nickname}'s projects
          </div>
        </div>
        <div className="flex  items-center">
          <div className="border-2 border-slate-300/50 rounded-full  mr-5">
            <img
              src={user.picture}
              height={32}
              width={32}
              alt=""
              className="rounded-full cursor-pointer "
            />
          </div>
        </div>
      </div>
      <div className=" border-b  w-full border-white/10"></div>
      <div className="grid grid-cols-12  gap-10 p-5">
        <div className="col-span-3     flex flex-col gap-3 ">
          <div className="text-white/85 mb-2 pl-2">Import your repos</div>
          <div
            className=" border border-neutral-600/60 h-122 rounded-lg overflow-y-auto 
           scrollbar scrollbar-thumb-zinc-400 rounded-scrollbar no-scroll-buttons"
          >
            {repos.map((x: any) => {
              return (
                <div
                  key={x.id}
                  className="p-4 border-b border-neutral-600/60 text-white flex justify-between font-semibold"
                >
                  <div className=" text-sm">
                    {x.name.length >= 20
                      ? x.name.substring(0, 20) + "..."
                      : x.name}
                  </div>
                  <div
                    className=" text-sm bg-white h-max-5 text-black p-1 flex flex-col justify-center  font-semibold
                   rounded-lg px-2 cursor-pointer hover:bg-white/70 transition duration-200 ease-in-out"
                  >
                    Import
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-9 flex flex-col gap-3">
          <div className="text-white/85 mb-2 pl-2">Your Projects</div>
          <div className="border border-neutral-600/60 h-130  rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
