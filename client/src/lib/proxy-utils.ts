/**
 * Validates if the provided string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Encodes a URL for safe transmission in a query parameter
 * Uses base64 encoding for better compatibility with special characters
 */
export function encodeUrl(url: string): string {
  return encodeURIComponent(btoa(url));
}

/**
 * Decodes a URL from a query parameter
 * Handles base64 decoding
 */
export function decodeUrl(encodedUrl: string): string {
  return atob(decodeURIComponent(encodedUrl));
}

/**
 * Strips potential dangerous parts from a URL
 */
export function sanitizeUrl(url: string): string {
  const urlObj = new URL(url);
  
  // Remove any javascript: protocol
  if (urlObj.protocol.includes('javascript:')) {
    urlObj.protocol = 'https:';
  }
  
  return urlObj.toString();
}

/**
 * Modifies HTML content to ensure all links and resources use the proxy
 */
export function rewriteHtml(html: string, baseUrl: string, proxyEndpoint: string): string {
  const baseUrlObj = new URL(baseUrl);
  const baseOrigin = baseUrlObj.origin;
  
  // Replace relative URLs with absolute ones and route through the proxy
  const rewrittenHtml = html
    // Rewrite links
    .replace(/href=['"](.*?)['"]/g, (match, url) => {
      if (url.startsWith('#')) {
        return match; // Leave anchors as-is
      }
      
      try {
        const absoluteUrl = new URL(url, baseOrigin).href;
        return `href="${proxyEndpoint}?url=${encodeUrl(absoluteUrl)}"`;
      } catch {
        return match;
      }
    })
    // Rewrite image sources
    .replace(/src=['"](.*?)['"]/g, (match, url) => {
      if (url.startsWith('data:')) {
        return match; // Leave data URIs as-is
      }
      
      try {
        const absoluteUrl = new URL(url, baseOrigin).href;
        return `src="${proxyEndpoint}?url=${encodeUrl(absoluteUrl)}"`;
      } catch {
        return match;
      }
    })
    // Rewrite CSS url() references
    .replace(/url\(['"]?(.*?)['"]?\)/g, (match, url) => {
      if (url.startsWith('data:')) {
        return match; // Leave data URIs as-is
      }
      
      try {
        const absoluteUrl = new URL(url, baseOrigin).href;
        return `url("${proxyEndpoint}?url=${encodeUrl(absoluteUrl)}")`;
      } catch {
        return match;
      }
    });
  
  return rewrittenHtml;
}
