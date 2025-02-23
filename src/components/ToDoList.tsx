"use client";

import { trpcNextAPIClient } from "@/app/_trpc/client";
import React, { PropsWithChildren } from "react";

export default function TodoList({ children }: PropsWithChildren) {
  const getTodos = trpcNextAPIClient.getTodos.useQuery();
  return (
    <div className="pv-10 mb-5 border-2 border-purple-600">
      <h3>{"Client Component - ToDoList | trpcNextAPIClient -> Component"}</h3>
      <>{children}</>
      <br />
      <div>
        {getTodos.data?.map((x, i) => (
          <React.Fragment key={i}>
            <h2>
              {" - "}
              {x}
            </h2>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
