import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(
  process.env.DATABASE_URL ??
    "postgres://postgres:postgres@localhost:5432/opend2c?sslmode=disable",
);

export const db = drizzle(client);
