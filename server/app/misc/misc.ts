import { Request, Response } from "express";

export async function error404(req: Request, res: Response): Promise<void> {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/html");
  res.send(`<div><h1>Endpoint does not exist.</h1></div>`);

  return;
}

export async function sysError(
  error: { statusCode?: number; message?: string; data?: object },
  req: Request,
  res: Response
) {
  const status = error?.statusCode || 500;
  const message = error?.message || "Critical system error";
  const data = error?.data;
  res.statusCode = 500;
  res.status(status).json({ err: { msg: message, data }, valid: false });

  return;
}
