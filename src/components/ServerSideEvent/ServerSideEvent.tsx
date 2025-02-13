"use client";
import { useEffect, useState } from "react";

export default function ServerSideEvent() {
  const [count, setCount] = useState<string | number>("...");
  const [data, setData] = useState<string | number>("...");
  useEffect(() => {
    const eventSource = connectEvent();

    if (eventSource) eventAction(eventSource);

    return () => {
      if (eventSource) eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function connectEvent() {
    try {
      // const eventSource = new EventSource("http://localhost:3040/events", {
      const eventSource = new EventSource(`/server/listen`, {
        withCredentials: true,
      });

      eventAction(eventSource);

      return eventSource;
    } catch (error) {
      console.log({ error });

      return null;
    }
  }

  function eventAction(source: EventSource) {
    source.onmessage = (event) => {
      console.log({ event });
      if (event.data) {
        try {
          const data = JSON.parse(event.data);
          console.log({ data });
          if (data.count) {
            setCount(data.count);
            setData(data.data);
          }
        } catch (error) {
          console.log({ error });
        }
      }
    };
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Server-Side Event</h1>
      <p className="max-w-80 mb-5">
        This is a server side event (SSE) which is distributed over redis for
        scalability. Every time the event is triggered data is streamed in to
        the clients. This is a one way stream which can be used to distribute
        data in real time to a large amount of clients
      </p>
      <p style={{ marginLeft: 20, fontSize: 20 }}>
        {`Count: `}
        <span style={{ color: "lightgreen", fontWeight: "bolder" }}>
          {count ? count : "..."}
        </span>
        <br />
        {`Data: `}
        <span style={{ color: "lightgreen", fontWeight: "bolder" }}>
          {data ? data : "..."}
        </span>
      </p>
    </>
  );
}
