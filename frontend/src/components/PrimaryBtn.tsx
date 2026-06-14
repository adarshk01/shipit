interface btnProp {
  title: string;
}

export function PrimaryBtn({ title }: btnProp) {
  return (
    <div>
      <div className="flex justify-center items-center text-black bg-emerald-400  mix-blend-screen rounded-full w-fit p-1 px-3 text-xs font-semibold  ">
        {title}
      </div>
    </div>
  );
}
