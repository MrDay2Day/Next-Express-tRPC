process
  .on("warning", (e) => console.warn(e.stack))
  .on("unhandledRejection", (reason, p) =>
    console.log(reason, `Unhandled Rejection at Promise - ${p}`)
  )
  .on("uncaughtException", (exception_err) =>
    console.log(exception_err, "Uncaught Exception Error")
  );

import dotenv from "dotenv";
dotenv.config();

import startNextExpressServer from "./server/index";

startNextExpressServer();
