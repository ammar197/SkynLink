import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { insertPropertySchema, insertAreaSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Properties endpoints
  app.get("/api/properties", async (req, res) => {
    try {
      const filters = {
        areaId: req.query.areaId ? Number(req.query.areaId) : undefined,
        type: req.query.type as string | undefined,
        gender: req.query.gender as string | undefined,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined
      };
      
      const properties = await storage.getProperties(filters);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  app.post("/api/properties", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "owner") {
      return res.status(403).json({ message: "Only property owners can create listings" });
    }

    try {
      const validatedData = insertPropertySchema.parse(req.body);
      const property = await storage.createProperty({
        ...validatedData,
        ownerId: req.user.id
      });
      
      res.status(201).json(property);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create property" });
    }
  });

  app.put("/api/properties/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const id = Number(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      if (property.ownerId !== req.user.id) {
        return res.status(403).json({ message: "You don't have permission to edit this property" });
      }
      
      const validatedData = insertPropertySchema.partial().parse(req.body);
      const updatedProperty = await storage.updateProperty(id, validatedData);
      
      res.json(updatedProperty);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid property data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update property" });
    }
  });

  app.delete("/api/properties/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const id = Number(req.params.id);
      const property = await storage.getProperty(id);
      
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      if (property.ownerId !== req.user.id) {
        return res.status(403).json({ message: "You don't have permission to delete this property" });
      }
      
      await storage.deleteProperty(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete property" });
    }
  });

  app.get("/api/my-properties", async (req, res) => {
    if (!req.isAuthenticated() || req.user.role !== "owner") {
      return res.status(403).json({ message: "Only property owners can access this endpoint" });
    }

    try {
      const properties = await storage.getUserProperties(req.user.id);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  // Areas endpoints
  app.get("/api/areas", async (req, res) => {
    try {
      const areas = await storage.getAreas();
      res.json(areas);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch areas" });
    }
  });

  app.get("/api/areas/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const area = await storage.getArea(id);
      
      if (!area) {
        return res.status(404).json({ message: "Area not found" });
      }
      
      res.json(area);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch area" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
