"use client";

import React, { useEffect, useState } from "react";
import { LoadingComp } from "../../app/loading";

export default function ClientContainer(props: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 6000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="p-4 border-2 border-sky-400">
      <h2>This is a client container that takes 6 seconds to load.</h2>
      {isReady ? props.children : <LoadingComp />}
    </div>
  );
}
