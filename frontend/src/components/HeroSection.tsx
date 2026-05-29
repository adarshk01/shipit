import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useRef } from "react";
gsap.registerPlugin(MotionPathPlugin, DrawSVGPlugin);

export function Hero() {
  const pathRef = useRef(null);

  useGSAP(() => {
    {
      /*t1 is for globe wires*/
    }

    const tl = gsap.timeline({});
    tl.to(".sampleWire", {
      attr: {
        d: "M 650,0 Q 910,100 1000,500",
      },
      duration: 40,
      stagger: {
        each: 6.5,
        repeat: -1,
        repeatDelay: 6.5,
      },
      ease: "none",
    });
    tl.seek(tl.duration() / 2);

    tl.play();

    tl.timeScale(2);

    gsap.to(pathRef.current, {
      repeat: -1,
      rotation: -360,
      ease: "none",
      svgOrigin: "527 524",
      duration: 10,
    });

    const arc = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    arc.fromTo(
      "#arcMask",
      {
        drawSVG: "0%",
      },
      {
        duration: 5,
        drawSVG: "100%",
        ease: "none",
      }
    );
    arc.to(
      "#arcdot",
      {
        duration: 5,
        ease: "none",
        motionPath: {
          path: "#arc",
          align: "#arc",
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
      },
      0
    );
    arc.to("#arcMask", { drawSVG: "100% 100%", duration: 5, ease: "none" });
  }, []);

  return (
    <div className=" ">
      <div className="relative flex justify-center " id="globe">
        <div
          className="h-250 w-250 rounded-full absolute bg-emerald-500  z-0  shadow-[0_0_100px_rgb(255,255,255)_inset] flex justify-center items-center  [clip-path:inset(0_-30%_70%_-30%)]"
          style={{
            backgroundImage: `radial-gradient(circle at 0.15px 0.15px, rgba(38, 34, 43,0.25) 1.5px, transparent 0)`,
            backgroundSize: "3.5px 3.5px",
            backgroundRepeat: "repeat",
          }}
        >
          <div className="inset-0 flex justify-center items-center  absolute z-60 -top-95 blur-3xl  ">
            <div
              className="w-full h-1/2 bg-black/95   "
              style={{
                clipPath: "ellipse(50% 30% at 50% 50%)",
              }}
            ></div>
          </div>
          <div className="h-full w-full  rounded-full absolute z-20  overflow-hidden">
            {/* svg goes here*/}
            <svg height="1000" width="1000">
              <path
                id="wire"
                d="

                M 250,50 Q 500,-5 750,50
                M 200,95 Q 500,20 800,95
                M 150,140 Q 500,75 850,140
                M 90,200 Q 500,130 910,200
                M 50,270 Q 500,200 950,270"
                fill="none"
                className="  stroke-emerald-300/60 stroke-[1.75]"
              />
              {Array.from({ length: 7 }).map((_, i) => (
                <path
                  key={i}
                  className="sampleWire"
                  d="M 310,0 Q 30,100 20,500"
                  fill="none"
                  //#6EE7B799 className="stroke-emerald-300/60 stroke-[1.5]"
                  stroke="#6EE7B799"
                  strokeWidth={"1.75"}
                />
              ))}
            </svg>
          </div>
        </div>
        <div className="relative h-250 w-250  mask-b-from-5% mask-b-to-25% ">
          <div className="h-250 w-250 absolute rounded-full z-10 shadow-[0_0_50px_rgb(255,255,255)_inset]  "></div>
          <div className="h-250 w-250 absolute rounded-full z-10 shadow-[0_0_20px_rgb(255,255,255)_inset]  "></div>
        </div>
        <div className="absolute h-250 w-250 bg-teal-400/20  rounded-full shadow-[0_0_120px_rgb(0,255,195)] opacity-30 z-40  [clip-path:inset(-50%_-30%_70%_-30%)]">
          <div className="absolute h-250 w-250   rounded-full shadow-[0_0_10px_rgb(255,255,255)] z-40   [clip-path:inset(0_0_70%_0)]" />
        </div>
      </div>
      <div className="flex justify-center ">
        {/* <div className=" h-260 w-260 border absolute  top-110 border-emerald-400/20 bg-teal-400  rounded-full"></div> */}
        <svg height={"1054"} width={"1054"} className="absolute top-109 ">
          <defs>
            <radialGradient id="snowball" cx="0" cy="0" r="1">
              <stop offset="0%" stop-color="white" stop-opacity="1" />
              <stop offset="80%" stop-color="#34d399" stop-opacity="0.2" />
              <stop offset="90%" stop-color="#34d399" stop-opacity="0" />
            </radialGradient>
          </defs>
          <defs>
            <clipPath id="topHalf">
              {/* only visible area */}
              <rect x="0" y="0" width="1050" height="325" />
            </clipPath>
          </defs>
          <g transform="translate(0 5)" clipPath="url(#topHalf)">
            <circle
              id="template"
              r={524}
              cx={527}
              cy={525}
              className="stroke-1 stroke-emerald-400/10"
              fill="none"
            />
            <path
              ref={pathRef}
              d="M 523,0 A 524,524 0,0,1 898,158"
              className="stroke-1 stroke-[url(#snowball)] "
              fill="none"
            />
          </g>
          <mask id="arcBreaker">
            <path
              id="arcMask"
              d="M 205,145 C 245,-60 500,-50 700,400"
              className="stroke-3 "
              fill="transparent"
              stroke="white"
            />
          </mask>
          <g clipPath="url(#topHalf)">
            <g mask="url(#arcBreaker)">
              <path
                id="arc"
                d="M 205,145 C 245,-60 500,-50 700,400 "
                className="stroke-1 stroke-emerald-300/80 "
                strokeDasharray={"5 4"}
                fill="none"
              />
            </g>
            <circle id="arcdot" r={3.5} className="fill-emerald-400" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// mask-b-from-25% mask-b-to-31%   [mask-image:linear-gradient(to_bottom,black_25%,transparent_30%)]
