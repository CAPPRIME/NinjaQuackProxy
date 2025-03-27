import React, { useState } from 'react';
import { useContentFilter, ContentFilterOptions } from '@/hooks/use-content-filter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, ShieldCheck, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ContentFilterSettings() {
  const { toast } = useToast();
  const {
    filterOptions,
    isLoading,
    error,
    updateFilter,
    resetFilter,
    toggleFilter,
    addBlockedDomain,
    removeBlockedDomain,
    isPending,
  } = useContentFilter();

  const [newDomain, setNewDomain] = useState('');
  const [newKeyword, setNewKeyword] = useState('');

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain) return;
    
    const domain = newDomain.trim().toLowerCase();
    if (domain) {
      addBlockedDomain(domain);
      setNewDomain('');
      toast({
        title: 'Domain Added',
        description: `"${domain}" has been added to blocked domains.`,
      });
    }
  };

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword) return;
    
    const keyword = newKeyword.trim().toLowerCase();
    if (keyword) {
      const updatedKeywords = [...(filterOptions?.blockedKeywords || []), keyword];
      updateFilter({ blockedKeywords: updatedKeywords });
      setNewKeyword('');
      toast({
        title: 'Keyword Added',
        description: `"${keyword}" has been added to blocked keywords.`,
      });
    }
  };

  const handleRemoveDomain = (domain: string) => {
    removeBlockedDomain(domain);
    toast({
      title: 'Domain Removed',
      description: `"${domain}" has been removed from blocked domains.`,
    });
  };

  const handleRemoveKeyword = (keyword: string) => {
    const updatedKeywords = (filterOptions?.blockedKeywords || []).filter(k => k !== keyword);
    updateFilter({ blockedKeywords: updatedKeywords });
    toast({
      title: 'Keyword Removed',
      description: `"${keyword}" has been removed from blocked keywords.`,
    });
  };

  const handleToggleFilter = (checked: boolean) => {
    toggleFilter(checked);
    toast({
      title: checked ? 'Content Filter Enabled' : 'Content Filter Disabled',
      description: checked 
        ? 'Web content will now be filtered according to your settings.' 
        : 'Content filtering is now disabled.',
    });
  };

  const handleToggleSetting = (setting: string, value: boolean) => {
    if (filterOptions) {
      updateFilter({ [setting]: value } as Partial<ContentFilterOptions>);
    }
  };

  const handleReset = () => {
    resetFilter();
    toast({
      title: 'Settings Reset',
      description: 'Content filter settings have been reset to defaults.',
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse text-primary">Loading content filter settings...</div>
      </div>
    );
  }

  if (error || !filterOptions) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <p>Failed to load content filter settings. Please try again.</p>
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg border-t-4 border-t-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              Content Filter
            </CardTitle>
            <CardDescription>
              Control what content is accessible through the proxy
            </CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Label htmlFor="filter-enabled" className={filterOptions.enabled ? 'text-primary font-medium' : 'text-muted-foreground'}>
              {filterOptions.enabled ? 'Enabled' : 'Disabled'}
            </Label>
            <Switch
              id="filter-enabled"
              checked={filterOptions.enabled}
              onCheckedChange={handleToggleFilter}
              disabled={isPending}
            />
          </div>
        </div>
      </CardHeader>

      <Tabs defaultValue="general" className="w-full">
        <CardContent className="pt-6">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="general">General Settings</TabsTrigger>
            <TabsTrigger value="domains">Blocked Domains</TabsTrigger>
            <TabsTrigger value="keywords">Blocked Keywords</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <div className="grid gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Safe Search</h3>
                  <p className="text-sm text-muted-foreground">
                    Enable safe search filters on Google, Bing, and other search engines
                  </p>
                </div>
                <Switch
                  checked={filterOptions.safeSearch}
                  onCheckedChange={(checked) => handleToggleSetting('safeSearch', checked)}
                  disabled={isPending || !filterOptions.enabled}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Block Explicit Content</h3>
                  <p className="text-sm text-muted-foreground">
                    Block adult websites and explicit content
                  </p>
                </div>
                <Switch
                  checked={filterOptions.blockExplicitContent}
                  onCheckedChange={(checked) => handleToggleSetting('blockExplicitContent', checked)}
                  disabled={isPending || !filterOptions.enabled}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Block Social Media</h3>
                  <p className="text-sm text-muted-foreground">
                    Block access to social media platforms
                  </p>
                </div>
                <Switch
                  checked={filterOptions.blockSocialMedia}
                  onCheckedChange={(checked) => handleToggleSetting('blockSocialMedia', checked)}
                  disabled={isPending || !filterOptions.enabled}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Block Gambling Sites</h3>
                  <p className="text-sm text-muted-foreground">
                    Block access to gambling and betting websites
                  </p>
                </div>
                <Switch
                  checked={filterOptions.blockGambling}
                  onCheckedChange={(checked) => handleToggleSetting('blockGambling', checked)}
                  disabled={isPending || !filterOptions.enabled}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="domains" className="space-y-6">
            <form onSubmit={handleAddDomain} className="flex gap-2">
              <Input
                placeholder="Enter domain to block (e.g., example.com)"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                disabled={isPending || !filterOptions.enabled}
                className="flex-1"
              />
              <Button type="submit" disabled={isPending || !filterOptions.enabled || !newDomain.trim()}>
                Add
              </Button>
            </form>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Blocked Domains</h3>
              {filterOptions.blockedDomains.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No domains blocked</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {filterOptions.blockedDomains.map((domain) => (
                    <Badge key={domain} variant="secondary" className="flex items-center gap-1 py-1">
                      {domain}
                      <button
                        type="button"
                        onClick={() => handleRemoveDomain(domain)}
                        disabled={isPending}
                        className="ml-1 rounded-full hover:bg-muted p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="keywords" className="space-y-6">
            <form onSubmit={handleAddKeyword} className="flex gap-2">
              <Input
                placeholder="Enter keyword to block"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                disabled={isPending || !filterOptions.enabled}
                className="flex-1"
              />
              <Button type="submit" disabled={isPending || !filterOptions.enabled || !newKeyword.trim()}>
                Add
              </Button>
            </form>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-3">Blocked Keywords</h3>
              {filterOptions.blockedKeywords.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No keywords blocked</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {filterOptions.blockedKeywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="flex items-center gap-1 py-1">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(keyword)}
                        disabled={isPending}
                        className="ml-1 rounded-full hover:bg-muted p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>

      <CardFooter className="flex justify-between border-t p-6">
        <Button variant="outline" onClick={handleReset} disabled={isPending}>
          Reset to Defaults
        </Button>
        <p className="text-xs text-muted-foreground self-end italic">
          Changes are saved automatically
        </p>
      </CardFooter>
    </Card>
  );
}