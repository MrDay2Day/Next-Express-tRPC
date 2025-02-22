export function LoadingComp() {
  return (
    <div className="animate-fadeInOut flex max-w-full w-full  h-24 bg-sky-950 justify-center items-center rounded-md">
      <h1 className="text-slate-300">Loading...</h1>
    </div>
  );
}

export default function Loading() {
  return <LoadingComp />;
}
