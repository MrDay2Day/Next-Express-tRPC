"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../../lib/socket/socketHook";

export default function ListenTest() {
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

  return <p>Socket Listen test - {value}</p>;
}
