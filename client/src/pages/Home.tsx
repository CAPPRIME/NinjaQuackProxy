import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import ProxyLogo from "@/components/proxy/ProxyLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidUrl, encodeUrl } from "@/lib/proxy-utils";

export default function Home() {
  const [, setLocation] = useLocation();
  const [inputUrl, setInputUrl] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleProxySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputUrl) return;

    // Add http:// if protocol is missing
    const formattedUrl = inputUrl.startsWith("http://") || inputUrl.startsWith("https://") 
      ? inputUrl 
      : `https://${inputUrl}`;
    
    if (!isValidUrl(formattedUrl)) {
      setErrorMessage("Invalid URL format. Please enter a valid URL with http:// or https://");
      return;
    }

    // Encode URL and navigate to proxy page
    const encodedUrl = encodeUrl(formattedUrl);
    setLocation(`/proxy?url=${encodedUrl}`);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-dark dark:text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-8 text-center">
          <ProxyLogo />
          
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Browse websites anonymously through this secure proxy service.
            Your online activity stays private and protected.
          </p>
        </header>

        {/* Navigation */}
        <nav className="mb-8 flex justify-center">
          <div className="flex space-x-2 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-md">
            <Link href="/" className="px-4 py-2 rounded bg-primary text-white font-medium">
              Home
            </Link>
            <Link href="/search" className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 font-medium">
              Search
            </Link>
            <Link href="/apps-games" className="px-4 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 font-medium">
              Apps & Games
            </Link>
            <button
              onClick={toggleDarkMode}
              className="px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="mb-16">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Enter a URL to browse anonymously</h2>
              
              <form onSubmit={handleProxySubmit} className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="https://example.com"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">Go</Button>
                </div>
                
                {errorMessage && (
                  <p className="text-red-500 text-sm">{errorMessage}</p>
                )}
              </form>
            </div>
            
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Search Anonymously</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Use our secure search to keep your queries private.
                </p>
                <Button onClick={() => setLocation("/search")} variant="outline" className="w-full">
                  Search Now
                </Button>
              </div>
              
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Popular Apps & Games</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Access apps and games instantly through our proxy.
                </p>
                <Button onClick={() => setLocation("/apps-games")} variant="outline" className="w-full">
                  Browse Collection
                </Button>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4 text-primary">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Private Browsing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse without leaving traces or being tracked by websites.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4 text-primary">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Optimized for speed with minimal impact on browsing experience.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4 text-primary">🎮</div>
              <h3 className="text-xl font-semibold mb-2">Games & Apps</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access popular games and applications through our secure proxy.
              </p>
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>NinjaQuack Proxy - for educational and legal purposes only.</p>
          <p className="mt-1">© {new Date().getFullYear()} NinjaQuack. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
