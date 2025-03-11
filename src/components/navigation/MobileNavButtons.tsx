import { Button } from "../ui/button";

export default async function MobileNavButtons() {
  return (
    <div className="md:hidden sticky bottom-0 bg-[--background] h-20 border-t-[1px] border-t-slate-300 shadow-top flex items-center justify-evenly ">
      {Array(5)
        .fill(null)
        .map((_: null, i: number) => {
          return (
            <Button
              key={i}
              className=" border-[1px] border-slate-300 shadow-lg min-h-14 min-w-14 rounded-full"
            ></Button>
          );
        })}
    </div>
  );
}
