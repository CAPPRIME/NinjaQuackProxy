import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define proxy request schema
export const proxyRequests = pgTable("proxy_requests", {
  id: serial("id").primaryKey(),
  targetUrl: text("target_url").notNull(),
  timestamp: text("timestamp").notNull().default(new Date().toISOString()),
  statusCode: integer("status_code"),
  success: boolean("success").notNull().default(true),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  headers: jsonb("headers").$type<Record<string, string>>(),
});

export const insertProxyRequestSchema = createInsertSchema(proxyRequests).pick({
  targetUrl: true,
  statusCode: true,
  success: true,
  userAgent: true,
  referrer: true,
  headers: true,
});

// User schema from the original file
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Export types
export type InsertProxyRequest = z.infer<typeof insertProxyRequestSchema>;
export type ProxyRequest = typeof proxyRequests.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
