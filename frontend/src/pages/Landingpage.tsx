import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Hero } from "../components/HeroSection";
import { PrimaryBtn } from "../components/PrimaryBtn";

export function Landingpage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen p-8">
      <Appbar />

      <div>
        <div className="mt-17">
          <div className="flex justify-center">
            <div className="flex gap-5 text-green-600 text-xs p-1 px-5 rounded-full bg-green-950">
              <div>Audited</div>
              <div>1-click deployment</div>
              <div>Fast Deploy</div>
            </div>
          </div>
          <div className="flex justify-center text-white mt-5">
            <div className="font-bold text-5xl w-150 text-center leading-14 ">
              Deploy with Next-Gen AI Based hosting platform
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <span className="text-white/70 w-100 text-xs text-center">
              Deploy your app with one-click superfast deployment and next-gen
              AI powered, Vercel doesn't stand a chance!
            </span>
          </div>
          <div className="flex justify-center mt-6 gap-5">
            <div
              className="cursor-pointer"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <PrimaryBtn />
            </div>
            <div className="text-green-500/70 bg-green-950/80 p-1 px-2 rounded-full text-xs font-semibold">
              Demo
            </div>
          </div>
          <div>
            <Hero />
          </div>
        </div>
      </div>
    </div>
  );
}
