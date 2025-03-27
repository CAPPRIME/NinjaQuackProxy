import type { Request, Response } from "express";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { decodeUrl, sanitizeUrl, encodeUrl } from "../client/src/lib/proxy-utils";
import { shouldFilterUrl, applySafeSearch } from "./content-filter";

/**
 * Allowed content types for rewriting URLs
 */
const HTML_CONTENT_TYPES = [
  "text/html",
  "application/xhtml+xml",
  "application/xml",
];

const CSS_CONTENT_TYPES = [
  "text/css",
];

/**
 * Add an error banner to the HTML content for error pages
 */
function addErrorBanner(html: string, statusCode: number): string {
  const bannerHtml = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: rgba(220, 38, 38, 0.9);
      color: white;
      padding: 12px;
      text-align: center;
      font-family: Arial, sans-serif;
      z-index: 9999;
    ">
      <strong>Error ${statusCode}:</strong> The website returned an error. You may want to try a different site.
      <button onclick="this.parentNode.style.display='none'" style="
        background-color: white;
        color: #dc2626;
        border: none;
        padding: 4px 8px;
        margin-left: 8px;
        border-radius: 4px;
        cursor: pointer;
      ">
        Dismiss
      </button>
    </div>
  `;
  
  // Insert the banner after the opening body tag
  if (html.includes('<body')) {
    return html.replace(/<body[^>]*>/, match => `${match}${bannerHtml}`);
  } else {
    // If no body tag, insert at the beginning
    return bannerHtml + html;
  }
}

// Simple in-memory rate limiting
const rateLimit = {
  requests: new Map<string, number[]>(),
  maxRequests: 10, // Maximum requests per minute per domain
  interval: 60 * 1000, // 1 minute
  
  isLimited(domain: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(domain) || [];
    
    // Clean up old requests
    const recentRequests = requests.filter(time => time > now - this.interval);
    
    // Update the requests list
    this.requests.set(domain, recentRequests);
    
    // Check if the number of recent requests exceeds the maximum
    return recentRequests.length >= this.maxRequests;
  },
  
  addRequest(domain: string): void {
    const now = Date.now();
    const requests = this.requests.get(domain) || [];
    requests.push(now);
    this.requests.set(domain, requests);
  }
};

/**
 * Add a content filtered banner to HTML content
 */
function addContentFilteredBanner(html: string, reason: string): string {
  const bannerHtml = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background-color: rgba(99, 102, 241, 0.9);
      color: white;
      padding: 12px;
      text-align: center;
      font-family: Arial, sans-serif;
      z-index: 9999;
    ">
      <strong>Access Restricted:</strong> ${reason}
      <div style="margin-top: 8px;">
        <a href="/" style="
          background-color: white;
          color: #4F46E5;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          margin-right: 8px;
        ">
          Back Home
        </a>
        <button onclick="this.parentNode.parentNode.style.display='none'" style="
          background-color: transparent;
          color: white;
          border: 1px solid white;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
        ">
          Dismiss
        </button>
      </div>
    </div>
  `;

  // Return just the banner with minimal HTML
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Content Filtered - NinjaQuack</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f9fafb;
          color: #1f2937;
          padding: 20px;
          text-align: center;
        }
        h1 {
          color: #4F46E5;
        }
        .container {
          max-width: 600px;
          margin: 100px auto;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 20px;
        }
      </style>
    </head>
    <body>
      ${bannerHtml}
      <div class="container">
        <h1>Content Filtered</h1>
        <p>${reason}</p>
        <p>This content has been restricted by the content filter settings.</p>
        <a href="/" style="
          display: inline-block;
          background-color: #4F46E5;
          color: white;
          padding: 10px 20px;
          border-radius: 4px;
          text-decoration: none;
          margin-top: 20px;
        ">
          Return Home
        </a>
      </div>
    </body>
    </html>
  `;
}

/**
 * Main proxy request handler
 */
export async function proxyRequest(encodedUrl: string, req: Request, res: Response): Promise<void> {
  try {
    // Decode and sanitize the URL
    const targetUrl = sanitizeUrl(decodeUrl(encodedUrl));
    const urlObj = new URL(targetUrl);
    
    // Apply content filtering
    const filterResult = shouldFilterUrl(targetUrl);
    if (filterResult.blocked) {
      // Return a content filtered page
      res.setHeader('Content-Type', 'text/html');
      res.status(403).send(addContentFilteredBanner('', filterResult.reason || 'Content blocked by filter settings'));
      return;
    }
    
    // Apply safe search if needed
    const safeSearchUrl = applySafeSearch(targetUrl);
    const finalUrl = safeSearchUrl || targetUrl;
    
    // Check rate limiting based on domain
    if (rateLimit.isLimited(urlObj.hostname)) {
      console.log(`Rate limit exceeded for ${urlObj.hostname}`);
      res.status(429).json({
        message: "Rate limit exceeded. Please try again later.",
        status: 429
      });
      return;
    }
    
    // Add this request to rate limiting
    rateLimit.addRequest(urlObj.hostname);
    
    // Configure proxy request
    const config: AxiosRequestConfig = {
      url: finalUrl,
      method: req.method as AxiosRequestConfig["method"],
      responseType: "arraybuffer", // Use arraybuffer to handle binary data
      headers: {
        // Forward common headers but exclude host
        accept: req.headers.accept,
        "user-agent": req.headers["user-agent"] || "Mozilla/5.0 (compatible; NinjaQuackProxy/1.0)",
        "accept-language": req.headers["accept-language"],
        "cache-control": req.headers["cache-control"],
        // Add referrer to improve acceptance by target sites
        "referer": urlObj.origin
      },
      // Increase timeout for larger resources
      timeout: 30000,
      // Allow redirects
      maxRedirects: 5,
      validateStatus: null, // Don't throw on any status code
    };

    // Make the request to the target site
    const response = await axios(config);

    // Get the content type
    const contentType = response.headers["content-type"] || "";
    
    // Set response headers
    // Only forward safe headers to avoid CORS issues
    const headersToCopy = [
      "content-type",
      "cache-control",
      "last-modified",
      "etag",
      "content-language",
    ];

    headersToCopy.forEach((header) => {
      if (response.headers[header]) {
        res.setHeader(header, response.headers[header]);
      }
    });

    // Always set CORS headers to allow same-origin framing
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    
    // Set X-Frame-Options to allow framing
    res.setHeader("X-Frame-Options", "ALLOWALL");
    
    // Remove Content-Security-Policy to avoid restrictions
    res.removeHeader("Content-Security-Policy");

    // Check if the status is 429 (too many requests) and handle it specially
    if (response.status === 429) {
      console.log(`Received 429 from the target site: ${targetUrl}`);
      
      // Return a custom 429 response with a helpful message
      res.status(429).json({
        message: "The website is temporarily unavailable due to high traffic. Please try again later.",
        status: 429
      });
      return;
    }
    
    // Set the status code for other responses
    res.status(response.status);

    // Process and rewrite URLs in HTML/CSS content
    if (isContentType(contentType, HTML_CONTENT_TYPES) || isContentType(contentType, CSS_CONTENT_TYPES)) {
      const buffer = Buffer.from(response.data);
      let body = buffer.toString("utf-8");

      // Rewrite URLs in the content
      body = rewriteContent(body, targetUrl, contentType);
      
      // Add our own banner for error pages
      if (response.status >= 400) {
        body = addErrorBanner(body, response.status);
      }

      res.send(body);
    } else {
      // For binary or other content, pass through unchanged
      res.send(Buffer.from(response.data));
    }
  } catch (error) {
    handleProxyError(error as Error, res);
  }
}

/**
 * Handles errors in proxy requests
 */
function handleProxyError(error: Error, res: Response): void {
  console.error("Proxy error:", error);

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status || 500;
    const errorMessage = axiosError.message || "Request failed";

    res.status(status).json({
      message: `Proxy error: ${errorMessage}`,
      status,
    });
  } else {
    res.status(500).json({
      message: `Proxy error: ${error.message}`,
      status: 500,
    });
  }
}

/**
 * Checks if the contentType is in the list of allowedTypes
 */
function isContentType(contentType: string, allowedTypes: string[]): boolean {
  return allowedTypes.some((type) => contentType.includes(type));
}

/**
 * Rewrites URLs in HTML and CSS content to route through the proxy
 */
function rewriteContent(content: string, baseUrl: string, contentType: string): string {
  const baseUrlObj = new URL(baseUrl);
  const baseOrigin = baseUrlObj.origin;
  const proxyPath = "/api/proxy?url=";

  if (isContentType(contentType, HTML_CONTENT_TYPES)) {
    // Process HTML content
    return content
      // Rewrite links
      .replace(/href=["'](.*?)["']/g, (match, url) => {
        if (url.startsWith("#") || url.startsWith("javascript:") || url.startsWith("data:")) {
          return match; // Leave anchors and special URLs as-is
        }
        
        try {
          const absoluteUrl = new URL(url, baseOrigin).href;
          return `href="${proxyPath}${encodeUrl(absoluteUrl)}"`;
        } catch {
          return match;
        }
      })
      // Rewrite image sources
      .replace(/src=["'](.*?)["']/g, (match, url) => {
        if (url.startsWith("data:") || url.startsWith("blob:")) {
          return match; // Leave data URIs as-is
        }
        
        try {
          const absoluteUrl = new URL(url, baseOrigin).href;
          return `src="${proxyPath}${encodeUrl(absoluteUrl)}"`;
        } catch {
          return match;
        }
      })
      // Rewrite form actions
      .replace(/action=["'](.*?)["']/g, (match, url) => {
        if (url.startsWith("javascript:") || url === "#") {
          return match;
        }
        
        try {
          const absoluteUrl = new URL(url, baseOrigin).href;
          return `action="${proxyPath}${encodeUrl(absoluteUrl)}"`;
        } catch {
          return match;
        }
      });
  } else if (isContentType(contentType, CSS_CONTENT_TYPES)) {
    // Process CSS content
    return content.replace(/url\(["']?(.*?)["']?\)/g, (match, url) => {
      if (url.startsWith("data:") || url.startsWith("#")) {
        return match; // Leave data URIs and fragments as-is
      }
      
      try {
        const absoluteUrl = new URL(url, baseOrigin).href;
        return `url("${proxyPath}${encodeUrl(absoluteUrl)}")`;
      } catch {
        return match;
      }
    });
  }

  // For other content types, return as-is
  return content;
}
