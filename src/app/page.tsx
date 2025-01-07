import React, { lazy, Suspense } from "react";
import { LoadingComp } from "./loading";
import { nextDynamic } from "@/utils/dynamic";
import { trpcServer } from "@/utils/trpc/trpcServerSide";
import CookieDemo from "@/components/demo/cookie";

const TodoList = nextDynamic(
  // @ts-expect-error: None
  () => import("@/components/ToDoList"),
  {
    loading: () => <LoadingComp />, // Optional custom fallback
    ssr: true, // Optional: Disable server-side rendering for this component
  }
);

const ListenTest = lazy(
  // @ts-expect-error: None
  () => import("@/components/socket-comps/listen_test")
);

// @ts-expect-error: None
const Notes = nextDynamic(() => import("../components/hooks-comps/notes"), {
  loading: () => <LoadingComp />, // Optional custom fallback
  ssr: true, // Optional: Disable server-side rendering for this component
});

async function getNames() {
  try {
    const names = await trpcServer.UserManagement.getUsers.query(); // Does a fetch to local server
    return names;
  } catch (error) {
    console.log({ error });
    return null;
  }
}

export default async function Home() {
  const todolist = await trpcServer.UserManagement.getUsers.query();
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
      <p>
        {todolist.map((x, i) => {
          return (
            <React.Fragment key={i}>
              <span>{`${x.id}: ${x.name} - ${x.age} - ${x.email}`}</span>
              <br />
            </React.Fragment>
          );
        })}
      </p>
      {/* <NextTRPCComp /> */}
      <TodoList />
      <Suspense fallback={<LoadingComp />}>
        <ListenTest />
      </Suspense>
      <Notes />
      <CookieDemo />
    </div>
  );
}

export const dynamic = "force-dynamic"; // To ensure this page is rerendered on every request
