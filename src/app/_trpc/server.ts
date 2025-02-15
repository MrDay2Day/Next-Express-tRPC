import { createCaller_next } from "../(server)/api/trpc/_trpc_functions/main";
import { GetTRPCCallerTypes } from "./config/trpc_types";

function getTRPCCaller(others?: Partial<GetTRPCCallerTypes>) {
  return createCaller_next({
    req: null,
    res: null,
    authHeader: undefined,
    ...others,
  });
}

export { getTRPCCaller };
