"use server";
import React, { lazy, Suspense } from "react";
import { LoadingComp } from "../loading";
import { nextDynamic } from "@/utils/dynamic";
import { getTRPCCaller } from "../_trpc/server";

/** Express Server Functionality */
// import CookieDemo from "@/components/demo/cookie";

/** Express Server Functionality */
// import { trpcServerSide } from "../../server/trpc/trpcServerSide";

const NextTRPCComp = nextDynamic<
  React.ComponentProps<typeof import("@/components/NextTRPCComp").default>
>(
  // @ts-expect-error: None
  () => import("@/components/NextTRPCComp"),
  {
    loading: () => <LoadingComp />, // Optional custom fallback
    ssr: true, // Optional: Disable server-side rendering for this component
  }
);

// Get the type for the Component so you can pass props including children
const TodoList = nextDynamic<
  React.ComponentProps<typeof import("@/components/ToDoList").default>
  // @ts-expect-error: None
>(() => import("@/components/ToDoList"), {
  loading: () => <LoadingComp />,
  ssr: true,
});

const ListenTest = lazy(
  // @ts-expect-error: None
  () => import("@/components/socket-comps/listen_test")
);

// @ts-expect-error: None
const Notes = nextDynamic(() => import("../../components/hooks-comps/notes"), {
  loading: () => <LoadingComp />, // Optional custom fallback
  ssr: true, // Optional: Disable server-side rendering for this component
});

/** Express Server Functionality */
// async function getNames() {
//   try {
//     const names = await trpcServerSide.UserManagement.getUsers.query(); // Does a fetch to local server
//     return names;
//   } catch (error) {
//     console.log({ error });
//     return null;
//   }
// }

// export const dynamic = "force-dynamic"; // To ensure this page is rerendered on every request
export default async function Home() {
  /** Express Server Functionality */
  // const nameAgain = await trpcServerSide.UserManagement.getUsers.query();
  // const names = await getNames();

  /** tRPC Using Cloudflare D1 */
  const customers = await getTRPCCaller().customers.fetchAll();

  return (
    <div className="flex-auto justify-center">
      <div className="my-5 border-2 border-slate-400">
        <h1 className="font-bold text-xl">
          {"Home Page - (Rendered on Request)"}
        </h1>
        <p>This page is re rendered on every request</p>
        <p>{new Date().toISOString()}</p>
        <p>{'    export const dynamic = "force-dynamic";'}</p>
      </div>
      <div className="pv-10 mb-5 border-2 border-pink-600">
        <h1>{"Server Component - trpcServerSide -> Function -> Component"}</h1>
        <h2 className="font-bold text-red-600 mb-5">Data fetched using tRPC</h2>
        {/* Express Server Functionality */}
        {/* <ul>
          {names &&
            names.map((user) => (
              <li key={user.id}>{`${user.id} - ${user.name}`}</li>
            ))}
        </ul> */}
      </div>
      <div className="pv-10 mb-5 border-2 border-orange-400">
        <h1>{"Server Component - trpcServerSide -> Component"}</h1>
        {/* Express Server Functionality */}
        {/* <p>
          {nameAgain.map((x, i) => {
            return (
              <React.Fragment key={i}>
                <span>{`${x.id}: ${x.name} - ${x.age} - ${x.email}`}</span>
                <br />
              </React.Fragment>
            );
          })}
        </p> */}
      </div>
      <div className="pv-10 mb-5 border-2 border-slate-400">
        <h1>Using tRPC which pulls data from Cloudflare D1 SQLite Database</h1>
        <br />
        {customers.valid &&
          customers.results.map((e, i) => (
            <p
              key={`${i}-${e.CustomerId}`}
            >{`${e.CompanyName} - ${e.ContactName}`}</p>
          ))}
      </div>
      {/* <NextTRPCComp /> */}
      <TodoList>
        <p>Lazy Loaded with children props...</p>
      </TodoList>
      <Suspense fallback={<LoadingComp />}>
        <ListenTest>
          <p>Lazy Loaded with children props...</p>
        </ListenTest>
      </Suspense>
      <Notes />
      {/* Express Server Functionality */}
      {/* <CookieDemo /> */}
      <NextTRPCComp>
        <p>Lazy Loaded with children props...</p>
      </NextTRPCComp>
    </div>
  );
}
