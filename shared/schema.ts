import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the ProxyRequest schema
export const proxyRequests = pgTable("proxy_requests", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  timestamp: text("timestamp").notNull(),
  options: jsonb("options").notNull(),
  success: boolean("success").notNull(),
  errorMessage: text("error_message"),
});

// Create insert schema for ProxyRequests
export const insertProxyRequestSchema = createInsertSchema(proxyRequests).pick({
  url: true,
  timestamp: true,
  options: true,
  success: true,
  errorMessage: true,
});

// Define the ProxyOptions schema separately for client use
export const proxyOptionsSchema = z.object({
  removeScripts: z.boolean().default(false),
  removeAds: z.boolean().default(false),
  blockCookies: z.boolean().default(false),
});

export type ProxyOptions = z.infer<typeof proxyOptionsSchema>;
export type InsertProxyRequest = z.infer<typeof insertProxyRequestSchema>;
export type ProxyRequest = typeof proxyRequests.$inferSelect;
