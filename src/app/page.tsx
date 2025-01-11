// "use server";
import React, { lazy, Suspense } from "react";
import { LoadingComp } from "./loading";
import { nextDynamic } from "@/utils/dynamic";
import CookieDemo from "@/components/demo/cookie";
import { trpcServerSide } from "@/utils/trpc/trpcServerSide";

const NextTRPCComp = nextDynamic(
  // @ts-expect-error: None
  () => import("@/components/NextTRPCComp"),
  {
    loading: () => <LoadingComp />, // Optional custom fallback
    ssr: true, // Optional: Disable server-side rendering for this component
  }
);

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
    const names = await trpcServerSide.UserManagement.getUsers.query(); // Does a fetch to local server
    return names;
  } catch (error) {
    console.log({ error });
    return null;
  }
}

export const dynamic = "force-dynamic"; // To ensure this page is rerendered on every request
export default async function Home() {
  const nameAgain = await trpcServerSide.UserManagement.getUsers.query();
  const names = await getNames();
  return (
    <div className="flex-auto justify-center">
      <div className="my-5 ">
        <h1 className="font-bold text-xl">
          {"Home Page - (Rendered on Request)"}
        </h1>
        <p>This page is re rendered on every request</p>
        <p>{'    export const dynamic = "force-dynamic";'}</p>
      </div>
      <div className="pv-10 mb-5 border-2 border-orange-400">
        <h1>{"Server Component - trpcServerSide -> Function -> Component"}</h1>
        <h2 className="font-bold text-red-600 mb-5">Data fetched using tRPC</h2>
        {names &&
          names.map((user) => (
            <li key={user.id}>{`${user.id} - ${user.name}`}</li>
          ))}
      </div>
      <div className="pv-10 mb-5 border-2 border-orange-400">
        <h1>{"Server Component - trpcServerSide -> Component"}</h1>
        <p>
          {nameAgain.map((x, i) => {
            return (
              <React.Fragment key={i}>
                <span>{`${x.id}: ${x.name} - ${x.age} - ${x.email}`}</span>
                <br />
              </React.Fragment>
            );
          })}
        </p>
      </div>
      {/* <NextTRPCComp /> */}
      <TodoList />
      <Suspense fallback={<LoadingComp />}>
        <ListenTest />
      </Suspense>
      <Notes />
      <CookieDemo />
      <NextTRPCComp />
    </div>
  );
}
