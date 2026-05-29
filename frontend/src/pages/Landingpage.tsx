import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Hero } from "../components/HeroSection";
import { PrimaryBtn } from "../components/PrimaryBtn";
import shipIt from "../../public/shipIt.svg";
import { Graffiti } from "../components/Graffiti";
export function Landingpage() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen h-fit p-8 bg-[#011614]"
      style={{
        backgroundImage: `radial-gradient(circle at 0.15px 0.15px, rgba(38, 34, 43,0.75) 1.5px, transparent 0)`,
        backgroundSize: "3.5px 3.5px",
        backgroundRepeat: "repeat",
      }}
    >
      <Appbar />
      <div className="relative">
        <div className="absolute ">
          <Graffiti />
        </div>
      </div>
      <div>
        <div className="mt-17">
          <div className="flex justify-center">
            <div className="flex gap-5 text-emerald-400 text-xs p-1 px-5 rounded-full bg-emerald-950">
              <div>Audited</div>
              <div>1-click deployment</div>
              <div>Fast Deploy</div>
            </div>
          </div>
          <div className="flex justify-center text-emerald-50 mt-5">
            <div className="font-bold text-5xl w-150 text-center leading-14 ">
              <div className="flex justify-center ">
                <span className="pr-2">Deploy with</span>
                <div className="bg-emerald-500  px-2 flex justify-center items-center rounded-lg -rotate-12 ">
                  <img src={shipIt} alt="" className="h-8 w-8 rotate-12" />
                </div>
                <span className="pl-2"> ShipIt</span>
              </div>
              <span className="block"> A hosting platform</span>
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <span className="text-white/70 w-100 text-xs text-center">
              Deploy your app with one-click superfast deployment and next-gen AI powered, Vercel
              doesn't stand a chance!
            </span>
          </div>
          <div className="flex justify-center mt-6 gap-5 z-60">
            <div
              className="cursor-pointer z-60"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <PrimaryBtn />
            </div>
            <div className="text-emerald-500/70 bg-green-950/80 p-1 px-2 rounded-full text-xs font-semibold">
              Demo
            </div>
          </div>
          <div className="flex justify-center mt-20 ">
            <Hero />
            <div
              className="h-10 w-full  absolute top-187 z-70"
              style={{
                backgroundImage: `radial-gradient(circle at 0.15px 0.15px, rgba(38, 34, 43,0.75) 1.5px, transparent 0)`,
                backgroundSize: "3.5px 3.5px",
                backgroundRepeat: "repeat",
              }}
            >
              <div className="h-full w-full absolute bg-[#011614] blur-sm z-20"></div>
            </div>
          </div>
          <div className="text-white absolute top-200">hello</div>
        </div>
      </div>
    </div>
  );
}
