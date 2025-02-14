declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // [key: string]: string | undefined;
      DATABASE_D1: D1Database;
    }
  }
}
export {};
