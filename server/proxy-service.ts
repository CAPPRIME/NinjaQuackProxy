import type { Request, Response } from "express";
import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { decodeUrl, sanitizeUrl } from "../client/src/lib/proxy-utils";

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
 * Main proxy request handler
 */
export async function proxyRequest(encodedUrl: string, req: Request, res: Response): Promise<void> {
  try {
    // Decode and sanitize the URL
    const targetUrl = sanitizeUrl(decodeUrl(encodedUrl));

    // Configure proxy request
    const config: AxiosRequestConfig = {
      url: targetUrl,
      method: req.method as AxiosRequestConfig["method"],
      responseType: "arraybuffer", // Use arraybuffer to handle binary data
      headers: {
        // Forward common headers but exclude host
        accept: req.headers.accept,
        "user-agent": req.headers["user-agent"] || "Netlify-Proxy/1.0",
        "accept-language": req.headers["accept-language"],
        "cache-control": req.headers["cache-control"],
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

    // Set the status code
    res.status(response.status);

    // Process and rewrite URLs in HTML/CSS content
    if (isContentType(contentType, HTML_CONTENT_TYPES) || isContentType(contentType, CSS_CONTENT_TYPES)) {
      const buffer = Buffer.from(response.data);
      let body = buffer.toString("utf-8");

      // Rewrite URLs in the content
      body = rewriteContent(body, targetUrl, contentType);

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
          return `href="${proxyPath}${encodeURIComponent(absoluteUrl)}"`;
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
          return `src="${proxyPath}${encodeURIComponent(absoluteUrl)}"`;
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
          return `action="${proxyPath}${encodeURIComponent(absoluteUrl)}"`;
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
        return `url("${proxyPath}${encodeURIComponent(absoluteUrl)}")`;
      } catch {
        return match;
      }
    });
  }

  // For other content types, return as-is
  return content;
}
