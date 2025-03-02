export async function generateDatabase(): Promise<D1Database> {
  try {
    if (process.env && process.env.NEXTJS_ENV == "production") {
      return process.env.D1_DB as unknown as D1Database;
    }
  } catch (error) {
    console.log({ error });
  }

  const { getCloudflareContext } = await import("@opennextjs/cloudflare");
  const { env } = await getCloudflareContext();
  const DB = env.D1_DB as D1Database;
  return DB;
}

// export async function generateWebSocketObj() {
//   try {
//     if (process.env && process.env.NEXTJS_ENV == "production") {
//       return process.env;
//     }
//   } catch (error) {
//     console.log({ error });
//   }

//   const { getCloudflareContext } = await import("@opennextjs/cloudflare");
//   const WS_OBJ = (await getCloudflareContext()).env.WEBSOCKET_OBJ;
//   return WS_OBJ;
// }

export async function generateENVContext() {
  try {
    if (process.env && process.env.NEXTJS_ENV == "production") {
      return process.env;
    }
  } catch (error) {
    console.log({ error });
  }

  const { getCloudflareContext } = await import("@opennextjs/cloudflare");
  const CONTEXT = await getCloudflareContext();
  return CONTEXT;
}
