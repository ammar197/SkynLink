import { users, properties, areas, type User, type InsertUser, type Property, type InsertProperty, type Area, type InsertArea } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { db } from "./db";
import { eq, and, gte, lte } from "drizzle-orm";
import { pool } from "./db";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getArea(id: number): Promise<Area | undefined>;
  getAreas(): Promise<Area[]>;
  createArea(area: InsertArea): Promise<Area>;

  getProperty(id: number): Promise<Property | undefined>;
  getProperties(filters?: {
    areaId?: number;
    type?: string;
    gender?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Property[]>;
  getUserProperties(userId: number): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;

  sessionStore: any; // Using any instead of session.SessionStore to avoid TypeScript errors
}

export class DatabaseStorage implements IStorage {
  sessionStore: any; // Using any to avoid TypeScript errors

  constructor() {
    this.sessionStore = new PostgresSessionStore({ pool, createTableIfMissing: true });
    // Seed initial areas if not already there
    this.seedAreasIfNeeded();
  }

  private async seedAreasIfNeeded() {
    const existingAreas = await this.getAreas();
    if (existingAreas.length === 0) {
      const areasData: InsertArea[] = [
        { nameAr: "الفاتح", nameEn: "Fatih", imageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" },
        { nameAr: "تقسيم", nameEn: "Taksim", imageUrl: "https://pixabay.com/get/g15d0bb75908e7ff701f6769080cd15e33df6a46f7ae7ed248c59e4375907d1cbf3f6d946d79313626a7516c3cec1c64b0e6c338428293d17d9a66fd4c6a7b7b4_1280.jpg" },
        { nameAr: "بشكتاش", nameEn: "Beşiktaş", imageUrl: "https://pixabay.com/get/g8da98e1214f0c950f04af95cce161bcd7191ae01acd4c58985076e3b1bc0e05f1fdb1c7f83b8a506001ec78793e197703309e13905e101869d0182626c5c3122_1280.jpg" },
        { nameAr: "شيشلي", nameEn: "Şişli", imageUrl: "https://images.unsplash.com/photo-1542192143-6cb2c972e497?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" },
      ];

      for (const area of areasData) {
        await this.createArea(area);
      }
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getArea(id: number): Promise<Area | undefined> {
    const [area] = await db.select().from(areas).where(eq(areas.id, id));
    return area || undefined;
  }

  async getAreas(): Promise<Area[]> {
    return await db.select().from(areas);
  }

  async createArea(insertArea: InsertArea): Promise<Area> {
    const [area] = await db.insert(areas).values(insertArea).returning();
    return area;
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async getProperties(filters?: {
    areaId?: number;
    type?: string;
    gender?: string;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<Property[]> {
    // Start with base query
    let query = db.select().from(properties);
    
    if (filters) {
      const conditions = [];
      
      if (filters.areaId) {
        conditions.push(eq(properties.areaId, filters.areaId));
      }
      
      if (filters.type && filters.type !== 'all') {
        conditions.push(eq(properties.type, filters.type));
      }
      
      if (filters.gender && filters.gender !== 'all') {
        conditions.push(eq(properties.gender, filters.gender));
      }
      
      if (filters.minPrice !== undefined) {
        conditions.push(gte(properties.price, filters.minPrice));
      }
      
      if (filters.maxPrice !== undefined) {
        conditions.push(lte(properties.price, filters.maxPrice));
      }
      
      if (conditions.length > 0) {
        query = query.where(and(...conditions));
      }
    }
    
    // Execute the query and return results
    try {
      return await query.execute();
    } catch (error) {
      console.error('Error fetching properties:', error);
      return [];
    }
  }

  async getUserProperties(userId: number): Promise<Property[]> {
    try {
      return await db.select().from(properties).where(eq(properties.ownerId, userId)).execute();
    } catch (error) {
      console.error('Error fetching user properties:', error);
      return [];
    }
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db.insert(properties).values(insertProperty).returning();
    return property;
  }

  async updateProperty(id: number, updatedFields: Partial<InsertProperty>): Promise<Property | undefined> {
    const [property] = await db
      .update(properties)
      .set(updatedFields)
      .where(eq(properties.id, id))
      .returning();
    
    return property;
  }

  async deleteProperty(id: number): Promise<boolean> {
    const result = await db.delete(properties).where(eq(properties.id, id));
    return result.count > 0;
  }
}

// Keep the MemStorage class for reference, but don't export it

// This class is kept for reference only and is no longer used
class _MemStorage {
  private users: Map<number, User>;
  private areas: Map<number, Area>;
  private properties: Map<number, Property>;
  sessionStore: any;

  private userCurrentId: number;
  private areaCurrentId: number;
  private propertyCurrentId: number;

  constructor() {
    this.users = new Map();
    this.areas = new Map();
    this.properties = new Map();
    this.userCurrentId = 1;
    this.areaCurrentId = 1;
    this.propertyCurrentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Initialize with some areas
    this.seedAreas();
  }

  private seedAreas() {
    const areasData: InsertArea[] = [
      { nameAr: "الفاتح", nameEn: "Fatih", imageUrl: "https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" },
      { nameAr: "تقسيم", nameEn: "Taksim", imageUrl: "https://pixabay.com/get/g15d0bb75908e7ff701f6769080cd15e33df6a46f7ae7ed248c59e4375907d1cbf3f6d946d79313626a7516c3cec1c64b0e6c338428293d17d9a66fd4c6a7b7b4_1280.jpg" },
      { nameAr: "بشكتاش", nameEn: "Beşiktaş", imageUrl: "https://pixabay.com/get/g8da98e1214f0c950f04af95cce161bcd7191ae01acd4c58985076e3b1bc0e05f1fdb1c7f83b8a506001ec78793e197703309e13905e101869d0182626c5c3122_1280.jpg" },
      { nameAr: "شيشلي", nameEn: "Şişli", imageUrl: "https://images.unsplash.com/photo-1542192143-6cb2c972e497?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400" },
    ];

    areasData.forEach(area => {
      this.createArea(area);
    });
  }

  // All other methods remain the same
  // ...
}

export const storage = new DatabaseStorage();
