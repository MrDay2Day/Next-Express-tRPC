import { lazy, Suspense } from "react";
import { LoadingComp } from "./loading";
import { nextDynamic } from "@/utils/dynamic";
import { trpcServer } from "@/utils/trpcServerSide";
import CookieDemo from "@/components/demo/cookie";

// import Notes from "@/components/hooks-comps/notes";
// import ListenTest from "@/components/socket-comps/listen_test";

const ListenTest = lazy(
  // @ts-expect-error: None
  () => import("@/components/socket-comps/listen_test")
);
// const Notes = lazy(() => import("@/components/hooks-comps/notes"));

// @ts-expect-error: None
const Notes = nextDynamic(() => import("../components/hooks-comps/notes"), {
  loading: () => <LoadingComp />, // Optional custom fallback
  ssr: true, // Optional: Disable server-side rendering for this component
});

async function getNames() {
  try {
    const names = await trpcServer.getUsers.query(); // Does a fetch to local server
    return names;
  } catch (error) {
    console.log({ error });
    return null;
  }
}
export const dynamic = "force-dynamic"; // To ensure this page is rerendered on every request
export default async function Home() {
  const names = await getNames();
  return (
    <div className="flex-auto justify-center">
      <h1 className="mb-10">{"Home Page (Static on Demand)"}</h1>
      <div className="pv-10 mb-10">
        <h2 className="font-bold text-red-600 mb-5">Data fetched using tRPC</h2>
        {names &&
          names.map((user) => (
            <li key={user.id}>{`${user.id} - ${user.name}`}</li>
          ))}
      </div>
      <Suspense fallback={<LoadingComp />}>
        <ListenTest />
      </Suspense>
      <Notes />
      <CookieDemo />
    </div>
  );
}
