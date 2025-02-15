// import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export type GetTRPCCallerTypes = {
  req: NextRequest | null;
  res: NextResponse | null;
  authHeader?: string | null | undefined;
};
