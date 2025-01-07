"use client";

import { trpcNextAPIClient } from "@/app/_trpc/client";
import React from "react";

export default function TodoList() {
  const getTodos = trpcNextAPIClient.getTodos.useQuery();
  return (
    <div>
      <br />
      <div>
        {getTodos.data?.map((x, i) => (
          <React.Fragment key={i}>
            <h2>{x}</h2>
            <br />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
