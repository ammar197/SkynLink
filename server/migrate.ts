import { db } from "./db";
import { users, areas, properties } from "@shared/schema";
import { sql } from "drizzle-orm";

// Run the database migration
async function main() {
  console.log("Creating database tables...");
  
  // Drop existing tables if they exist
  console.log("Dropping existing tables...");
  await db.execute(sql`
    DROP TABLE IF EXISTS "properties";
    DROP TABLE IF EXISTS "areas";
    DROP TABLE IF EXISTS "users";
  `);
  console.log("Tables dropped successfully.");
  
  // Create users table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "users" (
      "id" SERIAL PRIMARY KEY,
      "username" TEXT NOT NULL,
      "password" TEXT NOT NULL,
      "full_name" TEXT NOT NULL,
      "email" TEXT NOT NULL,
      "phone" TEXT,
      "role" TEXT NOT NULL DEFAULT 'tenant'
    );
  `);
  
  // Create areas table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "areas" (
      "id" SERIAL PRIMARY KEY,
      "name_ar" TEXT NOT NULL,
      "name_en" TEXT NOT NULL,
      "image_url" TEXT
    );
  `);
  
  // Create properties table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "properties" (
      "id" SERIAL PRIMARY KEY,
      "title" TEXT NOT NULL,
      "title_ar" TEXT NOT NULL,
      "description" TEXT NOT NULL,
      "description_ar" TEXT NOT NULL,
      "price" INTEGER NOT NULL,
      "location" TEXT NOT NULL,
      "location_ar" TEXT NOT NULL,
      "type" TEXT NOT NULL,
      "gender" TEXT NOT NULL,
      "owner_id" INTEGER NOT NULL,
      "area_id" INTEGER NOT NULL,
      "rooms" INTEGER NOT NULL,
      "bathrooms" INTEGER NOT NULL,
      "image_url" TEXT NOT NULL
    );
  `);
  
  console.log("Database tables created successfully!");
}

main().catch((e) => {
  console.error("Error running migration: ", e);
  process.exit(1);
});