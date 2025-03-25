import { useState, useEffect } from "react";
import ProxyControls from "@/components/proxy/ProxyControls";
import ProxyFrame from "@/components/proxy/ProxyFrame";
import ErrorMessage from "@/components/proxy/ErrorMessage";
import ProxyLogo from "@/components/proxy/ProxyLogo";
import { isValidUrl, encodeUrl } from "@/lib/proxy-utils";

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [proxyHistory, setProxyHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
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

  const handleSubmit = (url: string) => {
    if (!url) return;

    // Add http:// if protocol is missing
    const formattedUrl = url.startsWith("http://") || url.startsWith("https://") 
      ? url 
      : `https://${url}`;
    
    if (!isValidUrl(formattedUrl)) {
      setErrorMessage("Invalid URL format. Please enter a valid URL with http:// or https://");
      return;
    }

    loadUrl(formattedUrl);
  };

  const loadUrl = (url: string) => {
    // Ensure URL is valid
    if (!isValidUrl(url)) {
      setErrorMessage("Invalid URL format. Please enter a valid URL with http:// or https://");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    // Update the history
    const newHistory = proxyHistory.slice(0, historyIndex + 1);
    newHistory.push(url);
    setProxyHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    // Set the current URL - this will be encoded before being passed to the proxy
    setCurrentUrl(url);
    
    // Simulate loading by waiting for iframe to load
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const clearUrl = () => {
    setCurrentUrl("");
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentUrl(proxyHistory[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < proxyHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentUrl(proxyHistory[historyIndex + 1]);
    }
  };

  const refreshProxy = () => {
    if (currentUrl) {
      loadUrl(currentUrl);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const dismissError = () => {
    setErrorMessage(null);
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

        {/* Main Content */}
        <main className="mb-8">
          {/* Proxy Controls */}
          <ProxyControls 
            onSubmit={handleSubmit}
            currentUrl={currentUrl}
            onClearUrl={clearUrl}
            onGoBack={goBack}
            onGoForward={goForward}
            onRefresh={refreshProxy}
            isMinimized={isMinimized}
            onToggleMinimize={toggleMinimize}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />

          {/* Error Message */}
          {errorMessage && (
            <ErrorMessage 
              message={errorMessage} 
              onDismiss={dismissError} 
            />
          )}

          {/* Proxy Frame */}
          <ProxyFrame 
            url={currentUrl ? `/api/proxy?url=${encodeUrl(currentUrl)}` : ""} 
            isLoading={isLoading} 
          />
        </main>
        
        {/* Footer */}
        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Netlify Proxy Service - for educational and legal purposes only.</p>
          <p className="mt-1">© {new Date().getFullYear()} Netlify Proxy. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
