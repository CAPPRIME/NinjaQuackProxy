import axios from "axios";

interface ProxyOptions {
  removeScripts: boolean;
  removeAds: boolean;
  blockCookies: boolean;
}

/**
 * Process HTML to rewrite URLs and apply proxy options
 */
function processHtml(html: string, baseUrl: string, options: ProxyOptions): string {
  let processedHtml = html;
  
  // Create a base URL for resolving relative URLs
  processedHtml = processedHtml.replace(
    /<head>/i, 
    `<head><base href="${baseUrl}">`
  );
  
  // Rewrite absolute URLs to go through our proxy
  processedHtml = rewriteAbsoluteUrls(processedHtml, baseUrl);
  
  // Apply options
  if (options.removeScripts) {
    processedHtml = removeScripts(processedHtml);
  }
  
  if (options.removeAds) {
    processedHtml = removeAds(processedHtml);
  }
  
  return processedHtml;
}

/**
 * Rewrite absolute URLs to go through our proxy
 */
function rewriteAbsoluteUrls(html: string, baseUrl: string): string {
  // Replace URLs in href, src, and action attributes
  const urlAttrs = ['href', 'src', 'action'];
  
  let processedHtml = html;
  
  urlAttrs.forEach(attr => {
    const regex = new RegExp(`${attr}=["'](https?://[^"']+)["']`, 'gi');
    processedHtml = processedHtml.replace(regex, (match, url) => {
      // Don't proxy data URLs or other special schemes
      if (url.startsWith('data:') || url.startsWith('javascript:') || url.startsWith('mailto:')) {
        return match;
      }
      
      const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
      return `${attr}="${proxyUrl}"`;
    });
  });
  
  // Handle url() in CSS
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  processedHtml = processedHtml.replace(styleRegex, (match, styleContent) => {
    const updatedStyleContent = styleContent.replace(
      /url\(['"]?(https?:\/\/[^'")]+)['"]?\)/gi,
      (match, url) => {
        const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
        return `url('${proxyUrl}')`;
      }
    );
    return match.replace(styleContent, updatedStyleContent);
  });
  
  // Handle CSS url() in inline styles
  const inlineStyleRegex = /style=["']([^"']*)["']/gi;
  processedHtml = processedHtml.replace(inlineStyleRegex, (match, styleContent) => {
    const updatedStyleContent = styleContent.replace(
      /url\(['"]?(https?:\/\/[^'")]+)['"]?\)/gi,
      (match, url) => {
        const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
        return `url('${proxyUrl}')`;
      }
    );
    return match.replace(styleContent, updatedStyleContent);
  });
  
  return processedHtml;
}

/**
 * Remove script tags from HTML
 */
function removeScripts(html: string): string {
  // Remove script tags
  let processedHtml = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove inline event handlers
  const eventHandlers = [
    'onabort', 'onblur', 'onchange', 'onclick', 'ondblclick', 'onerror', 'onfocus',
    'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onmousedown', 'onmousemove',
    'onmouseout', 'onmouseover', 'onmouseup', 'onreset', 'onresize', 'onselect',
    'onsubmit', 'onunload'
  ];
  
  eventHandlers.forEach(handler => {
    const regex = new RegExp(`\\s${handler}=["'][^"']*["']`, 'gi');
    processedHtml = processedHtml.replace(regex, '');
  });
  
  return processedHtml;
}

/**
 * Remove common ad-related elements
 */
function removeAds(html: string): string {
  const adSelectors = [
    'div[id*="ad"]',
    'div[class*="ad"]',
    'div[id*="banner"]',
    'div[class*="banner"]',
    'iframe[src*="ad"]',
    'iframe[src*="doubleclick"]',
    'iframe[src*="googleadservices"]'
  ];
  
  let processedHtml = html;
  
  // This is a simple approach - a real ad blocker would be more sophisticated
  adSelectors.forEach(selector => {
    const regex = new RegExp(`<([a-z]+)[^>]*(?:id|class)=["'][^"']*(?:ad|banner)[^"']*["'][^>]*>([\\s\\S]*?)<\\/\\1>`, 'gi');
    processedHtml = processedHtml.replace(regex, '');
  });
  
  return processedHtml;
}

/**
 * Fetch and process a URL through the proxy
 */
export async function proxyUrl(url: string, options: ProxyOptions): Promise<string> {
  try {
    // Parse the URL to get the domain for base URL
    const parsedUrl = new URL(url);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.host}`;
    
    // Prepare headers for the request
    const headers: Record<string, string> = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0',
    };
    
    if (!options.blockCookies) {
      headers['Cookie'] = '';
    }
    
    // Fetch the content from the target URL
    const response = await axios.get(url, {
      headers,
      responseType: 'text',
      maxRedirects: 5,
    });
    
    // Process the HTML
    if (response.headers['content-type']?.includes('text/html')) {
      return processHtml(response.data, baseUrl, options);
    }
    
    // Return raw content for non-HTML responses
    return response.data;
  } catch (error) {
    console.error('Proxy error:', error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Proxy error: ${error.response.status} ${error.response.statusText}`);
    }
    throw new Error('Failed to proxy the requested URL');
  }
}
