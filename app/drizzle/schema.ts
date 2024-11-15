import { bigserial, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: bigserial({ mode: "number" }).primaryKey().notNull(),
  username: varchar().unique().notNull(),
  password: varchar().notNull(),
  email: varchar().notNull(),
});

export const imagesTable = pgTable("images", {
  id: bigserial({ mode: "number" }).primaryKey().notNull(),
  user_id: integer().notNull(),
  key: varchar().notNull(),
});
