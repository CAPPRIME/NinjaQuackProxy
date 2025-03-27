/**
 * Content Filtering Service for NinjaQuack
 * 
 * This module handles filtering web content based on various criteria:
 * - Domain blocklist
 * - Keyword filtering
 * - Category-based filtering
 */

import { Request } from 'express';

// Types for content filtering
export interface ContentFilterOptions {
  enabled: boolean;
  blockedDomains: string[];
  blockedKeywords: string[];
  safeSearch: boolean;
  blockExplicitContent: boolean;
  blockSocialMedia: boolean;
  blockGambling: boolean;
}

// Default content filter settings
export const defaultFilterOptions: ContentFilterOptions = {
  enabled: false,
  blockedDomains: [],
  blockedKeywords: [],
  safeSearch: false,
  blockExplicitContent: false,
  blockSocialMedia: false,
  blockGambling: false
};

// Predefined content categories
const explicitContentDomains = [
  'pornhub.com',
  'xvideos.com',
  'xnxx.com',
  'youporn.com',
  'redtube.com'
];

const socialMediaDomains = [
  'facebook.com',
  'twitter.com',
  'instagram.com',
  'snapchat.com',
  'tiktok.com'
];

const gamblingDomains = [
  'bet365.com',
  'bovada.lv',
  'draftkings.com',
  'fanduel.com',
  'pokerstars.com'
];

// In-memory storage for filter settings
let currentFilterOptions: ContentFilterOptions = { ...defaultFilterOptions };

/**
 * Updates the content filter settings
 */
export function updateFilterOptions(options: Partial<ContentFilterOptions>): ContentFilterOptions {
  currentFilterOptions = { ...currentFilterOptions, ...options };
  return currentFilterOptions;
}

/**
 * Gets the current filter settings
 */
export function getFilterOptions(): ContentFilterOptions {
  return { ...currentFilterOptions };
}

/**
 * Checks if a URL should be filtered based on current settings
 */
export function shouldFilterUrl(url: string): { 
  blocked: boolean;
  reason?: string;
} {
  // If filtering is disabled, don't block anything
  if (!currentFilterOptions.enabled) {
    return { blocked: false };
  }

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    const path = urlObj.pathname;
    const fullUrl = url.toLowerCase();

    // Check domain blocklist
    if (currentFilterOptions.blockedDomains.some(blockedDomain => 
      domain.includes(blockedDomain.toLowerCase())
    )) {
      return { blocked: true, reason: 'Domain is blocked by user settings' };
    }

    // Check keyword blocklist
    if (currentFilterOptions.blockedKeywords.some(keyword => 
      fullUrl.includes(keyword.toLowerCase())
    )) {
      return { blocked: true, reason: 'URL contains blocked keywords' };
    }

    // Check category filters
    if (currentFilterOptions.blockExplicitContent) {
      if (explicitContentDomains.some(domain => fullUrl.includes(domain))) {
        return { blocked: true, reason: 'Content blocked: Explicit material' };
      }
    }

    if (currentFilterOptions.blockSocialMedia) {
      if (socialMediaDomains.some(domain => fullUrl.includes(domain))) {
        return { blocked: true, reason: 'Content blocked: Social media' };
      }
    }

    if (currentFilterOptions.blockGambling) {
      if (gamblingDomains.some(domain => fullUrl.includes(domain))) {
        return { blocked: true, reason: 'Content blocked: Gambling site' };
      }
    }

    // Not blocked
    return { blocked: false };
  } catch (error) {
    // Invalid URL or other error, default to not blocking
    console.error('Error checking URL filter:', error);
    return { blocked: false };
  }
}

/**
 * Apply safe search parameters to search engine URLs
 */
export function applySafeSearch(url: string): string {
  if (!currentFilterOptions.safeSearch) {
    return url;
  }

  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    // Apply safe search for Google
    if (domain.includes('google.com')) {
      urlObj.searchParams.set('safe', 'active');
      return urlObj.toString();
    }

    // Apply safe search for Bing
    if (domain.includes('bing.com')) {
      urlObj.searchParams.set('adlt', 'strict');
      return urlObj.toString();
    }

    // Apply safe search for DuckDuckGo
    if (domain.includes('duckduckgo.com')) {
      urlObj.searchParams.set('kp', '1');
      return urlObj.toString();
    }

    // Apply safe search for Yahoo
    if (domain.includes('yahoo.com')) {
      urlObj.searchParams.set('vm', 'r');
      return urlObj.toString();
    }

    // Default: return unchanged URL
    return url;
  } catch (error) {
    console.error('Error applying safe search:', error);
    return url;
  }
}