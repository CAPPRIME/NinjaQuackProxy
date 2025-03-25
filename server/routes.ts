import type { Express } from "express";
import { createServer, type Server } from "http";
import { proxyRequest } from "./proxy-service";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add proxy routes
  app.get("/api/proxy", async (req, res) => {
    try {
      const { url } = req.query;
      
      if (!url || typeof url !== "string") {
        return res.status(400).json({ message: "URL parameter is required" });
      }
      
      // Proxy the request
      await proxyRequest(url, req, res);
      
    } catch (error) {
      console.error("Proxy error:", error);
      
      // Handle errors that may have already sent a response
      if (!res.headersSent) {
        res.status(500).json({ 
          message: error instanceof Error ? error.message : "An unknown error occurred"
        });
      }
    }
  });

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
