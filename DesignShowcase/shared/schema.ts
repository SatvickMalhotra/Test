import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnail: text("thumbnail").notNull(),
  liveUrl: text("live_url"),
  videoUrl: text("video_url"),
  tags: text("tags").array().notNull(),
  fullDescription: text("full_description").notNull()
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
