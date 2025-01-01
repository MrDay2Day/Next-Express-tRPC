// import { Request,  } from "express";
//@ts-expect-error: unable to find types
import emitter from "cluster-emitter";
import { catchErrorPromise } from "../../../src/utils/catchError";
import { createClient } from "redis";
import { Request, Response } from "express";

const SSE_EVENT = "server_event_name";
const REDIS_CHANNEL = "server_sse";

export const userRedis = process.env.USE_REDIS === "y";

const redisClientPub = userRedis
  ? createClient({
      url: process.env.REDIS_URL,
    })
  : null;
const redisClientSub = userRedis ? redisClientPub?.duplicate() : null;

redisClientPub?.on("error", (err) => {
  console.error("Redis SSE Pub Error", err);
});
redisClientSub?.on("error", (err) => {
  console.error("Redis SSE Sub Error:", err);
});

async function connectRedis() {
  try {
    console.log("CONNECTING TO REDIS FOR SSE");
    if (userRedis && redisClientPub && redisClientSub) {
      const [connErr] = await catchErrorPromise(
        Promise.all([redisClientPub?.connect(), redisClientSub?.connect()])
      );
      if (connErr) throw connErr;
      console.log("CONNECTED TO REDIS FOR SSE");
      redisClientSub?.subscribe([REDIS_CHANNEL], (response) => {
        // console.log("REDIS -> EMITTER", response);
        emitter.emit(SSE_EVENT, response);
      });
    } else {
      console.log("REDIS SSE CONNECTIONS NOT ALLOWED");
    }
  } catch (error) {
    console.log("connectRedis", { error });
    if (userRedis) setTimeout(() => connectRedis(), 3000);
  }
}

connectRedis();

let count = 0;
const userSpecificData = () => {
  count++;
  return {
    count,
    userId: "Hello World",
    data: (Math.random() * 10000).toFixed(0), // Example user-specific data
  };
};

setInterval(async () => {
  await redisClientPub?.publish(
    REDIS_CHANNEL,
    JSON.stringify(userSpecificData())
  );
}, 3000);

export default class ServerSideEvent {
  static listen = async (req: Request, res: Response) => {
    try {
      console.log("SSE: New client connecting...");

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("X-Accel-Buffering", "no");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("Cache-Control", "no-cache");
      // res.setHeader("Access-Control-Allow-Origin", "*");

      res.write("data: Connect\n\n");
      res.flush();

      function sendEventData(data: Record<string, unknown>) {
        // console.log("EMITTER -> CLIENT", data);
        res.write(`data: ${data}\n\n`);
        res.flush();
      }
      req.on("error", (err) => console.log({ err }));
      req.on("close", () => emitter.removeListener(SSE_EVENT, sendEventData));

      emitter.on(SSE_EVENT, sendEventData);
    } catch (error) {
      console.log("SSE ERROR", error);
      res.status(500).json({ valid: false, error });
    }
  };

  static async trigger(req: Request, res: Response) {
    try {
      if (userRedis && redisClientPub) {
        await redisClientPub?.publish(
          REDIS_CHANNEL,
          JSON.stringify(userSpecificData())
        );
        console.log("CLIENT -> EMITTER");
      }

      res.json({ count, valid: true });
      count++;
    } catch (error) {
      console.log({ error });
      res.status(500).json({ valid: false, error });
    }
  }
}
