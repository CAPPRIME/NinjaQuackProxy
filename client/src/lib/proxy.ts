import { apiRequest } from "./queryClient";

type ProxyOptions = {
  removeScripts: boolean;
  removeAds: boolean;
  blockCookies: boolean;
};

/**
 * Proxy a URL through the backend service
 */
export async function proxyUrl(url: string, options: ProxyOptions): Promise<string> {
  const response = await apiRequest('POST', '/api/proxy', {
    url,
    options,
  });
  
  return response.text();
}

/**
 * Rewrite URLs in HTML content to be proxied
 */
export function rewriteUrls(baseUrl: string, html: string): string {
  const urlRegex = /(href|src|action)=["'](https?:\/\/[^"']+)["']/gi;
  
  return html.replace(urlRegex, (match, attribute, url) => {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(url)}`;
    return `${attribute}="${proxyUrl}"`;
  });
}
