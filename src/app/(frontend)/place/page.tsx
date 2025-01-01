import { Suspense, lazy } from "react";
import { LoadingComp } from "@/app/loading";

// import dynamic from "next/dynamic";

// const Demo = dynamic(() => import("@/components/demo/demo"), {
//   loading: () => <LoadingComp />,
// });

// const GetData = dynamic(() => import("./getData"), {
//   loading: () => <LoadingComp />,
// });

// const ClientContainer = dynamic(
//   () => import("@/components/containers/clientContainer"),
//   {
//     loading: () => <LoadingComp />,
//   }
// );

// @ts-expect-error: will load
const Demo = lazy(() => import("../../../components/demo/demo"));
// @ts-expect-error: will load
const GetData = lazy(() => import("./getData"));
const ClientContainer = lazy(
  // @ts-expect-error: will load
  () => import("../../../components/containers/clientContainer")
);

export const dynamic = "force-dynamic"; // To ensure this page is rerendered on every request
export default async function Place() {
  return (
    <>
      <h1>Places</h1>
      <br />
      <Suspense fallback={<LoadingComp />}>
        <Suspense fallback={<LoadingComp />}>
          <Demo name="Dwight" />
        </Suspense>
        {/* <br /> */}
        <ClientContainer>
          <Suspense fallback={<LoadingComp />}>
            <GetData />
          </Suspense>
        </ClientContainer>
      </Suspense>
      <br />
    </>
  );
}
