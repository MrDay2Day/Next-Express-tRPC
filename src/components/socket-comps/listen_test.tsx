"use client";

import React, { useEffect, useState } from "react";
import { useSocket } from "../../lib/socket/socketHook";

export default function ListenTest({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketTools = useSocket();
  const [value, setValue] = useState("");

  useEffect(() => {
    socketTools?.socketListenOn("tick", (res: { data: string; date: Date }) => {
      console.log({ res });
      setValue(res.data || "No Data");
    });

    return () => {
      socketTools?.socketListenOff("tick");
    };
  }, [socketTools]);

  return (
    <div className="pv-10 mb-5 border-2 border-lime-600">
      <h3>{"Client Component - Socket Listen | useSocket Hook"}</h3>
      {children}
      <p>Socket Listen test - {value}</p>
    </div>
  );
}
