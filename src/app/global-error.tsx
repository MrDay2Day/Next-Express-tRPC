"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full max-w-full flex justify-center align-middle m-30 flex-col p-14">
      <h3 className="text-center">There seems to be an issue.</h3>
      <p className="text-center">{error.message}</p>
      <Button className="my-10" onClick={reset}>
        Try Again
      </Button>
    </div>
  );
}
