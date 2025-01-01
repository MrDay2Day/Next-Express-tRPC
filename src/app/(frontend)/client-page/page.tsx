// app/client-example/page.tsx
"use client";

import { useEffect, useState } from "react";
import { catchErrorPromise } from "../../../utils/catchError";
import { useSocket } from "../../../lib/socket/socketHook";
import ServerSideEvent from "@/components/ServerSideEvent/ServerSideEvent";

// This is a Client Component
export default function ClientPage() {
  const [data, setData] = useState<{ valid: boolean; date: Date } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketTools = useSocket();

  useEffect(() => {
    console.log({ socketTools });
  }, [socketTools]);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      // Need to call through an API route since we can't directly use server-only code
      const [resErr, response] = await catchErrorPromise(
        fetch("/apis/get-data", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 1234567890`,
            credentials: "include",
          },
          cache: "no-store",
        })
      );
      if (resErr) throw resErr;
      if (!response || !response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      setData({
        ...result,
        date: new Date(result.date), // Convert string back to Date object
      });
      return;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      return;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Client Component Page Example</h1>
      <button
        onClick={fetchData}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        disabled={loading}
      >
        Fetch data from NextAPI
      </button>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {data && !loading && (
        <div className="border p-4 rounded-lg">
          <p>Valid: {String(data.valid)}</p>
          <p>Date: {data.date.toISOString()}</p>
        </div>
      )}

      <div className="mt-5">
        <button
          onClick={() => {
            socketTools?.socketEmitListen(
              "ping",
              { NextJs: "15" },
              (data: unknown) => console.log({ data })
            );
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Trigger Socket
        </button>
      </div>
      <ServerSideEvent />
    </div>
  );
}
