"use server";

import { Suspense } from "react";
import { LoadingComp } from "../../loading";
import MapElement from "../../../components/map/map";

export default async function MapPage() {
  return (
    <>
      <Suspense fallback={<LoadingComp />}>
        <MapElement />
      </Suspense>
    </>
  );
}
