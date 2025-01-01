import { trpc } from "@/utils/trpc";

export async function fetchNames() {
  const names = await trpc.getUsers.query();
  console.log("tRPC Function");
  return names;
}
