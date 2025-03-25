import type { Express } from "express";
import { createServer, type Server } from "http";
import { proxyUrl } from "./proxy";
import { z } from "zod";

const proxyOptionsSchema = z.object({
  url: z.string().url(),
  options: z.object({
    removeScripts: z.boolean().default(false),
    removeAds: z.boolean().default(false),
    blockCookies: z.boolean().default(false)
  }).default({
    removeScripts: false,
    removeAds: false,
    blockCookies: false
  })
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Regular proxy endpoint - POST with URL in body
  app.post('/api/proxy', async (req, res) => {
    try {
      const { url, options } = proxyOptionsSchema.parse(req.body);
      
      const content = await proxyUrl(url, options);
      
      res.send(content);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: 'Invalid request parameters', errors: error.errors });
      } else {
        console.error('Proxy error:', error);
        res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to proxy the requested URL' });
      }
    }
  });

  // URL parameter proxy endpoint - for embedded resources
  app.get('/api/proxy', async (req, res) => {
    try {
      const url = z.string().url().parse(req.query.url as string);
      
      const options = {
        removeScripts: false,
        removeAds: false,
        blockCookies: false
      };
      
      const content = await proxyUrl(url, options);
      
      // Set appropriate content type
      if (url.endsWith('.css')) {
        res.set('Content-Type', 'text/css');
      } else if (url.endsWith('.js')) {
        res.set('Content-Type', 'application/javascript');
      } else if (url.endsWith('.png')) {
        res.set('Content-Type', 'image/png');
      } else if (url.endsWith('.jpg') || url.endsWith('.jpeg')) {
        res.set('Content-Type', 'image/jpeg');
      } else if (url.endsWith('.svg')) {
        res.set('Content-Type', 'image/svg+xml');
      }
      
      res.send(content);
    } catch (error) {
      console.error('Proxy error:', error);
      res.status(500).json({ message: error instanceof Error ? error.message : 'Failed to proxy the requested URL' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
