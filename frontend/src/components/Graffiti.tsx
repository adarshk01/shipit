export function Graffiti() {
  return (
    <div className=" ">
      {/* left side */}

      <svg height={700} width={350} className="-top-20 left-15 absolute ">
        <defs>
          <linearGradient id="grad1" x1={"0%"} x2={"0%"} y1={"0%"} y2={"100%"}>
            <stop offset={"60%"} stopColor="#6ee7b7" stopOpacity={0.05} />
            <stop offset={"100%"} stopColor="#011614" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path
          d="M 0,0 L 140,0 Q 260,225 300,450 L 240,450 Q 150,175 0,0 Z "
          className="fill-[url(#grad1)] "
        />
        {/* <path d="M " className="fill-emerald-50/2" /> #ecfdf5  stroke-1 stroke-emerald-400/7*/}
      </svg>

      <svg height={600} width={350} className="  -left-8 absolute">
        <defs>
          <linearGradient id="grad2" x1={"100%"} x2={"50%"} y1={"0%"} y2={"100%"}>
            <stop offset={"60%"} stopColor="#6ee7b7" stopOpacity={0.05} />
            <stop offset={"90%"} stopColor="#011614" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="strokeGrad" x1={"0%"} x2={"0%"} y1={"0%"} y2={"100%"}>
            <stop offset={"20%"} stopColor="#34d399" stopOpacity={0.2} />
            <stop offset={"50%"} stopColor="#34d399" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path
          d="M 0,0 Q 190,200 310,500 L 0,500"
          className="fill-[url(#grad2)] stroke-1 stroke-[url(#strokeGrad)]"
        />
      </svg>
      <svg height={350} width={350} className="  absolute -top-18 -left-9 ">
        <defs>
          <linearGradient id="blurart1" x1={"0%"} x2={"0%"} y1={"0%"} y2={"100%"}>
            <stop offset={"10%"} stopColor="#34d399" stopOpacity={0.7} />
            <stop offset={"70%"} stopColor="#34d399" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path
          d="M 0,50 L 0,0 L 120,0 Q 270,210 130,120 Q 150,250 0,50"
          className="fill-emerald-300 blur-3xl opacity-40 mix-blend-screen"
        />
        {/* opacity-40 blur-xl */}
        <g transform="rotate(-35) translate(-40 3)">
          <path
            d="M 0,0 L 60,0 L 60,240 C 60,260 0,260 0,240"
            className="fill-[url(#blurart1)]  blur-md  mix-blend-screen"
          />
          <g transform="rotate(-10) translate(30 12)">
            <path
              d="M 0,0 L 60,0 L 60,260 L 0,260"
              className="fill-[url(#blurart1)] blur-md  mix-blend-screen"
            />
          </g>
          <g transform="rotate(-25) translate(30 12)">
            <path
              d="M 0,0 L 60,0 L 60,260 L 0,260"
              className="fill-[url(#blurart1)] blur-md  mix-blend-screen"
            />
          </g>
        </g>
      </svg>

      {/* right side */}
      <svg height={700} width={350} className="-top-20 left-261 -scale-x-100 absolute">
        <defs>
          <linearGradient id="grad1" x1={"0%"} x2={"0%"} y1={"0%"} y2={"100%"}>
            <stop offset={"60%"} stopColor="#6ee7b7" stopOpacity={0.05} />
            <stop offset={"100%"} stopColor="#011614" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path
          d="M 0,0 L 140,0 Q 260,225 300,450 L 240,450 Q 150,175 0,0 Z "
          className="fill-[url(#grad1)] "
        />
      </svg>

      <svg height={600} width={350} className=" left-284.5 -scale-x-100 absolute">
        <defs>
          <linearGradient id="grad2" x1={"100%"} x2={"50%"} y1={"0%"} y2={"100%"}>
            <stop offset={"60%"} stopColor="#6ee7b7" stopOpacity={0.05} />
            <stop offset={"90%"} stopColor="#011614" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="strokeGrad" x1={"0%"} x2={"0%"} y1={"0%"} y2={"100%"}>
            <stop offset={"20%"} stopColor="#34d399" stopOpacity={0.2} />
            <stop offset={"50%"} stopColor="#34d399" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path
          d="M 0,0 Q 190,200 310,500 L 0,500"
          className="fill-[url(#grad2)] stroke-1 stroke-[url(#strokeGrad)]"
        />
      </svg>

      <svg height={350} width={350} className="  absolute -top-18 -scale-x-100 left-284.5">
        <defs>
          <linearGradient id="blurart1" x1={"0%"} x2={"0%"} y1={"0%"} y2={"100%"}>
            <stop offset={"10%"} stopColor="#34d399" stopOpacity={0.7} />
            <stop offset={"70%"} stopColor="#34d399" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path
          d="M 0,50 L 0,0 L 120,0 Q 270,210 130,120 Q 150,250 0,50"
          className="fill-emerald-300 blur-3xl opacity-40 mix-blend-screen"
        />
        {/* opacity-40 blur-xl */}
        <g transform="rotate(-35) translate(-40 3)">
          <path
            d="M 0,0 L 60,0 L 60,240 C 60,260 0,260 0,240"
            className="fill-[url(#blurart1)]  blur-md  mix-blend-screen"
          />
          <g transform="rotate(-10) translate(30 12)">
            <path
              d="M 0,0 L 60,0 L 60,260 L 0,260"
              className="fill-[url(#blurart1)] blur-md  mix-blend-screen"
            />
          </g>
          <g transform="rotate(-25) translate(30 12)">
            <path
              d="M 0,0 L 60,0 L 60,260 L 0,260"
              className="fill-[url(#blurart1)] blur-md  mix-blend-screen"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
