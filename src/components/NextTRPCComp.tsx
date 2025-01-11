"use client";
import React from "react";
import { trpcNextAPIClient } from "../app/_trpc/client";
import { Button } from "./ui/button";

export default function NextTRPCComp() {
  const hello = trpcNextAPIClient.hello.useQuery({ name: "Mr. Day2Day" });
  const addNumbersMutation = trpcNextAPIClient.addNumbers.useMutation();

  if (!hello.data) return <div>Loading...</div>;

  return (
    <div className="pv-10 mb-5 border-2 border-sky-400">
      <h1>{"Client Component - Next tRPC | trpcNextAPIClient -> Component"}</h1>
      <h1>{hello.data.greeting || "Umm..."}</h1>
      <Button
        className="bg-purple-500"
        onClick={() => {
          try {
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
                // onSettled(data, error, variables, context) {
                //   console.log("onSettled", { data, error, variables, context });
                // },
              }
            );
          } catch (error: unknown) {
            console.log({ error });
          }
        }}
      >
        Add Numbers
      </Button>
    </div>
  );
}
