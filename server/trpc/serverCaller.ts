import { createCaller } from "../app/trpc/trpc";
import { ExpressCallerTypes } from "../app/trpc/utilities/trpc_types";

function getExpressTRPCCaller(others?: Partial<ExpressCallerTypes>) {
  return createCaller({
    req: null,
    res: null,
    authHeader: undefined,
    ...others,
  });
}

export { getExpressTRPCCaller };
