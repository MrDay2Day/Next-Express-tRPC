import { NextApiRequest, NextApiResponse } from "next";

export interface CreateContextOptions {
  req: NextApiRequest | null;
  res: NextApiResponse | null;
}

export async function createNextAPIContext({ req, res }: CreateContextOptions) {
  const authHeader = req?.headers.authorization;
  return {
    req,
    res,
    authHeader,
  };
}
