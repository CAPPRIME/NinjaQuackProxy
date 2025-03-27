import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { encodeUrl } from "@/lib/proxy-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { openInBlankTab } from "@/lib/blank-tab";
import { ExternalLink } from "lucide-react";

// Define search engine options
const searchEngines = [
  { 
    id: "google", 
    name: "Google", 
    url: (query: string) => `https://www.google.com/search?q=${encodeURIComponent(query)}`,
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
  },
  { 
    id: "bing", 
    name: "Bing", 
    url: (query: string) => `https://www.bing.com/search?q=${encodeURIComponent(query)}`,
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.06 3v17.99l4.93-1.79V9.77l5.95 3.74v4.77l-3.25-1.92-2.03.73 5.28 3.91 8.06-3.86v-4.93l-14-8.37L5.06 3z" fill="#008373"/>
      </svg>
    ),
  },
  { 
    id: "duckduckgo", 
    name: "DuckDuckGo", 
    url: (query: string) => `https://duckduckgo.com/?q=${encodeURIComponent(query)}`,
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1z" fill="#DE5833"/>
        <path d="M9 17.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM17 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#FFF"/>
        <path d="M10.5 9.5c0-1.5-1.5-3-3.5-3s-3 2-3 3.5 1 2.5 3 2.5 3.5-1.5 3.5-3zM16.5 6.5c-1.5 0-2.5 1-2.5 2.5s1 2.5 2.5 2.5 2.5-1 2.5-2.5-1-2.5-2.5-2.5z" fill="#FDD20A"/>
      </svg>
    ),
  },
  { 
    id: "startpage", 
    name: "Startpage", 
    url: (query: string) => `https://www.startpage.com/search?q=${encodeURIComponent(query)}`,
    logo: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#6573FF"/>
        <path d="M8 7h8v2H8V7zm0 4h8v2H8v-2zm0 4h8v2H8v-2z" fill="#FFF"/>
      </svg>
    ),
  },
];

export default function Search() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEngine, setSelectedEngine] = useState("google");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // Find the selected search engine
    const engine = searchEngines.find(e => e.id === selectedEngine) || searchEngines[0];
    
    // Generate search URL based on the selected engine
    const searchUrl = engine.url(searchQuery);
    
    // Encode the URL for the proxy
    const encodedUrl = encodeUrl(searchUrl);
    
    // Navigate to the fullscreen proxy page with the encoded URL and specify search as the source
    setLocation(`/fullscreen?url=${encodedUrl}&source=search`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
        Anonymous Search
      </h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-primary/20">
        <form onSubmit={handleSearch} className="space-y-4">
          {/* Search Engine Selector */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Choose Search Engine
            </label>
            <div className="grid grid-cols-4 gap-2">
              {searchEngines.map((engine) => (
                <button
                  key={engine.id}
                  type="button"
                  onClick={() => setSelectedEngine(engine.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded-md text-sm transition-colors ${
                    selectedEngine === engine.id 
                      ? 'bg-primary/10 border-primary border text-primary'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {engine.logo}
                  <span className="mt-1">{engine.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="search" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Search Privately
            </label>
            <div className="flex gap-2">
              <Input
                id="search"
                type="text"
                placeholder="Enter your search query..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90">
                Search
              </Button>
            </div>
          </div>
        </form>
        
        <div className="mt-6 space-y-4">
          <div className="bg-primary/5 dark:bg-primary/10 p-4 rounded-md">
            <h3 className="font-medium text-primary mb-2">Search Engine Fallback</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              If one search engine is unavailable due to rate limiting, you can switch to another one. 
              Different engines have different strengths and privacy features.
            </p>
          </div>
          
          <div className="text-center mt-4">
            <Button 
              onClick={openInBlankTab}
              variant="outline"
              size="sm"
              className="mx-auto flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
            >
              <ExternalLink size={14} />
              Open in about:blank Tab
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Your searches are private and anonymous through NinjaQuack's proxy service</p>
            <p className="mt-1 text-xs">No search history or personal data is stored</p>
          </div>
        </div>
      </div>
    </div>
  );
}