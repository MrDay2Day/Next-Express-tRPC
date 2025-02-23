import "server-only";

import { publicProcedure_next, router_next } from "../../../trpc";
import { generateDatabase } from "../../../../../../cloudflare/database/config/config";
import { TRPCError } from "@trpc/server";

export const CustomerManagement = router_next({
  fetchAll: publicProcedure_next.query(async function () {
    try {
      const DB = await generateDatabase();
      const { results, success } = (await DB.prepare(
        "SELECT * FROM Customers"
      ).all()) as {
        success: boolean;
        results: {
          CustomerId: number;
          CompanyName: string;
          ContactName: string;
        }[];
      };

      return { valid: success, results };
    } catch (error) {
      const err = error as Error;
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Unable to fetch customers",
        cause: err?.message,
      });
    }
  }),
});
