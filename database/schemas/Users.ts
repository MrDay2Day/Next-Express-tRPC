import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/columns.helpers";
import { uniqueIndex } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer(),
    referralCode: varchar({ length: 20 }),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull().unique(),
    ...timestamps,
  },
  (table) => [uniqueIndex("referral_idx").on(table.referralCode)]
);
