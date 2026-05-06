import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const techSolutionsRequests = pgTable("tech_solutions_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company").notNull(),
  interest: text("interest").notNull(),
  description: text("description").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
