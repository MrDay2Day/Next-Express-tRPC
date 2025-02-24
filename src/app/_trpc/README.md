## IMPORTANT

This tRPC Producer is used for NextJs API and is only used with client side components.

### Server tRPC

The is a great example on how to access tRPC functions for server generated components.

```typescript
"use server"
import { createCaller_next } from "@/app/api/trpc/_trpc_functions/main";
...
async function fetchBook(id: number) {
  try {
    // Calling the NextAPI tRPC route to access the function on server component that is secured
    const appCaller_next = createCaller_next({
      req: null,
      res: null,
      authHeader: "Bearer USER.JWT.ACCESS",
    });
    const result = await appCaller_next.books.fetchBook(+id);
    console.log({ result });
    return { ...result, error: null };
  } catch (error: ErrorType | unknown) {
    console.log({ error });
    return { error: error as ErrorType, book: null };
  }
}
...

```

### Client tRPC

This is an example of how to use Next tRPC on the client side.

```typescript
"use client";
import React, { useState } from "react";
import { trpcNextAPIClient } from "../app/_trpc/client";
import { Button } from "./ui/button";

export default function NextTRPCComp(props: { children: React.ReactNode }) {
  const hello = trpcNextAPIClient.hello.useQuery({ name: "Mr. Day2Day" });
  const addNumbersMutation = trpcNextAPIClient.addNumbers.useMutation();

  const [numbers, setNumbers] = useState({ num1: 0, num2: 0 });
  const [result, setResult] = useState(0);

  function tRPCAction() {
    try {
      addNumbersMutation.mutate(numbers, {
        onSuccess: (data, variables) => {
          console.log("onSuccess", { data, variables });
          setResult(data.result);
        },
        onError(error, variables, context) {
          console.log("onError", { error, variables, context });
        },
        onSettled(data, error, variables, context) {
          console.log("onSettled", { data, error, variables, context });
        },
      });
    } catch (error: unknown) {
      console.log({ error });
    }
  }

  function setNum1(e: React.ChangeEvent<HTMLInputElement>) {
    setNumbers({ ...numbers, num1: +e.target.value });
  }

  function setNum2(e: React.ChangeEvent<HTMLInputElement>) {
    setNumbers({ ...numbers, num2: +e.target.value });
  }

  if (!hello.data) return <div>Loading...</div>;

  return (
    <div className="pv-10 mb-5 border-2 border-sky-400">
      <h3>{"Client Component - Next tRPC | trpcNextAPIClient -> Component"}</h3>
      {props.children}
      <h3>{hello.data.greeting || "Umm..."}</h3>
      <input
        className={"border-2 rounded-sm border-yellow-700 ml-5 mt-5"}
        type={"number"}
        value={numbers.num1}
        placeholder={"Number 1"}
        onChange={setNum1}
      />
      <br />
      <input
        className={"border-2 rounded-sm border-yellow-700 ml-5 mt-5"}
        type={"number"}
        value={numbers.num2}
        placeholder={"Number 2"}
        onChange={setNum2}
      />
      <h3 className="m-5 font-bold">{result}</h3>
      <Button className="bg-purple-500 ml-5 my-5" onClick={tRPCAction}>
        Add Numbers
      </Button>
    </div>
  );
}
```
