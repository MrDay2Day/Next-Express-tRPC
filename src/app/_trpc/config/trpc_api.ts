import { GetTRPCCallerTypes } from "./trpc_types";

export async function createNextAPIContext({
  req,
  res,
  authHeader,
}: GetTRPCCallerTypes): Promise<GetTRPCCallerTypes> {
  return {
    req,
    res,
    authHeader,
  };
}
