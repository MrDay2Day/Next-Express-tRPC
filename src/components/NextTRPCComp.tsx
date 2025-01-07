"use client";
import React from "react";
import { trpcNextAPIClient } from "../app/_trpc/client";
import { Button } from "./ui/button";

export default function NextTRPCComp() {
  const hello = trpcNextAPIClient.hello.useQuery({ name: "Client" });
  const addNumbersMutation = trpcNextAPIClient.addNumbers.useMutation();

  if (!hello.data) return <div>Loading...</div>;

  return (
    <div>
      <h1>{hello.data.greeting}</h1>
      <Button
        className="bg-purple-500"
        onClick={() => {
          addNumbersMutation.mutate(
            {
              num1: 5,
              num2: 10,
            },
            {
              onSuccess: (data, variables) => {
                console.log("onSuccess", { data, variables });
              },
              onError(error, variables, context) {
                console.log("onError", { error, variables, context });
              },
              onSettled(data, error, variables, context) {
                console.log("onSettled", { data, error, variables, context });
              },
            }
          );
        }}
      >
        Add Numbers
      </Button>
    </div>
  );
}
