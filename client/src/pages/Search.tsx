import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Search() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // Create a Google search URL with the query
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    
    // Encode the URL for the proxy
    const encodedUrl = encodeURIComponent(btoa(googleSearchUrl));
    
    // Navigate to the proxy page with the encoded URL
    setLocation(`/proxy?url=${encodedUrl}`);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Anonymous Search
      </h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="search" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Search Privately
            </label>
            <Input
              id="search"
              type="text"
              placeholder="Enter your search query..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Button type="submit" className="w-full">
            Search
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Your searches are private and anonymous through NinjaQuack's proxy service</p>
        </div>
      </div>
    </div>
  );
}