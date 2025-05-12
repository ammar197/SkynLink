import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  role: text("role").notNull().default("tenant"), // tenant, owner
});

export const areas = pgTable("areas", {
  id: serial("id").primaryKey(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  imageUrl: text("image_url"),
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleAr: text("title_ar").notNull(),
  description: text("description").notNull(),
  descriptionAr: text("description_ar").notNull(),
  price: integer("price").notNull(),
  location: text("location").notNull(),
  locationAr: text("location_ar").notNull(),
  type: text("type").notNull(), // full_apartment, private_room, shared_bed
  gender: text("gender").notNull(), // mixed, male, female
  ownerId: integer("owner_id").notNull(),
  areaId: integer("area_id").notNull(),
  rooms: integer("rooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  phone: true,
  role: true,
});

export const insertAreaSchema = createInsertSchema(areas);

export const insertPropertySchema = createInsertSchema(properties);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertArea = z.infer<typeof insertAreaSchema>;
export type Area = typeof areas.$inferSelect;

export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;
