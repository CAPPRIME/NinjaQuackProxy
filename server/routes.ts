import type { Express } from "express";
import { createServer, type Server } from "http";
import { proxyRequest } from "./proxy-service";
import { 
  getFilterOptions, 
  updateFilterOptions, 
  ContentFilterOptions, 
  defaultFilterOptions 
} from "./content-filter";

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

  // Content filter API routes
  app.get("/api/content-filter", (_req, res) => {
    const filterOptions = getFilterOptions();
    res.status(200).json(filterOptions);
  });

  app.post("/api/content-filter", (req, res) => {
    try {
      const updatedOptions = updateFilterOptions(req.body);
      res.status(200).json(updatedOptions);
    } catch (error) {
      console.error("Error updating content filter:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Invalid content filter options"
      });
    }
  });

  app.post("/api/content-filter/reset", (_req, res) => {
    const resetOptions = updateFilterOptions(defaultFilterOptions);
    res.status(200).json(resetOptions);
  });

  app.post("/api/content-filter/toggle", (req, res) => {
    const { enabled } = req.body;
    
    // Only update the enabled state
    if (typeof enabled === 'boolean') {
      const updatedOptions = updateFilterOptions({ enabled });
      res.status(200).json(updatedOptions);
    } else {
      res.status(400).json({ message: "Invalid request body. 'enabled' must be a boolean." });
    }
  });

  app.post("/api/content-filter/add-blocked-domain", (req, res) => {
    const { domain } = req.body;
    
    if (!domain || typeof domain !== 'string') {
      return res.status(400).json({ message: "Domain is required and must be a string" });
    }
    
    const currentOptions = getFilterOptions();
    const blockedDomains = [...currentOptions.blockedDomains];
    
    // Add domain if it's not already in the list
    if (!blockedDomains.includes(domain)) {
      blockedDomains.push(domain);
      const updatedOptions = updateFilterOptions({ blockedDomains });
      res.status(200).json(updatedOptions);
    } else {
      res.status(200).json(currentOptions); // Domain already exists, return current options
    }
  });

  app.post("/api/content-filter/remove-blocked-domain", (req, res) => {
    const { domain } = req.body;
    
    if (!domain || typeof domain !== 'string') {
      return res.status(400).json({ message: "Domain is required and must be a string" });
    }
    
    const currentOptions = getFilterOptions();
    const blockedDomains = currentOptions.blockedDomains.filter(d => d !== domain);
    
    const updatedOptions = updateFilterOptions({ blockedDomains });
    res.status(200).json(updatedOptions);
  });

  const httpServer = createServer(app);
  return httpServer;
}
