import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export interface ContentFilterOptions {
  enabled: boolean;
  blockedDomains: string[];
  blockedKeywords: string[];
  safeSearch: boolean;
  blockExplicitContent: boolean;
  blockSocialMedia: boolean;
  blockGambling: boolean;
}

// Query key for content filter settings
const CONTENT_FILTER_QUERY_KEY = ['content-filter'];

/**
 * Hook for using the content filter functionality
 */
export function useContentFilter() {
  const queryClient = useQueryClient();

  // Query the current content filter settings
  const { data: filterOptions, isLoading, error } = useQuery({
    queryKey: CONTENT_FILTER_QUERY_KEY,
    queryFn: async () => {
      const response = await fetch('/api/content-filter');
      if (!response.ok) {
        throw new Error('Failed to fetch content filter settings');
      }
      return response.json() as Promise<ContentFilterOptions>;
    },
  });

  // Mutation to update filter settings
  const updateFilterMutation = useMutation({
    mutationFn: async (options: Partial<ContentFilterOptions>) => {
      const response = await fetch('/api/content-filter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update filter settings');
      }
      
      return response.json() as Promise<ContentFilterOptions>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CONTENT_FILTER_QUERY_KEY, data);
    },
  });

  // Mutation to reset filter settings
  const resetFilterMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/content-filter/reset', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to reset filter settings');
      }
      
      return response.json() as Promise<ContentFilterOptions>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CONTENT_FILTER_QUERY_KEY, data);
    },
  });

  // Mutation to toggle filter enable state
  const toggleFilterMutation = useMutation({
    mutationFn: async (enabled: boolean) => {
      const response = await fetch('/api/content-filter/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enabled }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle filter state');
      }
      
      return response.json() as Promise<ContentFilterOptions>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CONTENT_FILTER_QUERY_KEY, data);
    },
  });

  // Mutation to add a blocked domain
  const addBlockedDomainMutation = useMutation({
    mutationFn: async (domain: string) => {
      const response = await fetch('/api/content-filter/add-blocked-domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add blocked domain');
      }
      
      return response.json() as Promise<ContentFilterOptions>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CONTENT_FILTER_QUERY_KEY, data);
    },
  });

  // Mutation to remove a blocked domain
  const removeBlockedDomainMutation = useMutation({
    mutationFn: async (domain: string) => {
      const response = await fetch('/api/content-filter/remove-blocked-domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domain }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove blocked domain');
      }
      
      return response.json() as Promise<ContentFilterOptions>;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(CONTENT_FILTER_QUERY_KEY, data);
    },
  });

  // Utility functions for common filter operations
  const updateFilter = useCallback(
    (options: Partial<ContentFilterOptions>) => {
      updateFilterMutation.mutate(options);
    },
    [updateFilterMutation]
  );

  const resetFilter = useCallback(() => {
    resetFilterMutation.mutate();
  }, [resetFilterMutation]);

  const toggleFilter = useCallback(
    (enabled: boolean) => {
      toggleFilterMutation.mutate(enabled);
    },
    [toggleFilterMutation]
  );

  const addBlockedDomain = useCallback(
    (domain: string) => {
      addBlockedDomainMutation.mutate(domain);
    },
    [addBlockedDomainMutation]
  );

  const removeBlockedDomain = useCallback(
    (domain: string) => {
      removeBlockedDomainMutation.mutate(domain);
    },
    [removeBlockedDomainMutation]
  );

  return {
    filterOptions,
    isLoading,
    error,
    updateFilter,
    resetFilter,
    toggleFilter,
    addBlockedDomain,
    removeBlockedDomain,
    isPending:
      updateFilterMutation.isPending ||
      resetFilterMutation.isPending ||
      toggleFilterMutation.isPending ||
      addBlockedDomainMutation.isPending ||
      removeBlockedDomainMutation.isPending,
  };
}