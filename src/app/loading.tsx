export function LoadingComp() {
  return (
    <div className="flex max-w-full w-full  h-max bg-slate-900 justify-center align-middle">
      <h1 className="text-slate-300">Loading...</h1>
    </div>
  );
}

export default function Loading() {
  return <LoadingComp />;
}
