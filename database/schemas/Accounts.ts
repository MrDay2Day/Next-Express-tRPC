import { integer, pgTable, varchar, uuid, decimal } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/columns.helpers";
import { usersTable } from "./Users";

export const accountsTable = pgTable("accounts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  accountNumber: uuid().defaultRandom().notNull().unique(),
  balance: decimal({ precision: 10, scale: 4 }).default("0.0000").notNull(), // Input/Output Will be string
  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
  description: varchar({ length: 255 }),
  ...timestamps,
});
