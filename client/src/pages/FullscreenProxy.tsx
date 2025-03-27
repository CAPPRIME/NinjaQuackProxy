import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { encodeUrl, decodeUrl, isValidUrl } from "@/lib/proxy-utils";

export default function FullscreenProxy() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [location] = useLocation();
  const [isSearch, setIsSearch] = useState<boolean>(false);

  // Parse URL from query parameters on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedUrl = params.get("url");
    const source = params.get("source") || "apps"; // Default to apps if not specified
    
    console.log("FullscreenProxy: Received params", { encodedUrl, source });
    setIsSearch(source === "search");
    
    if (encodedUrl) {
      try {
        // Try to decode the URL
        const decodedUrl = decodeUrl(encodedUrl);
        console.log("FullscreenProxy: Decoded URL", decodedUrl);
        
        if (isValidUrl(decodedUrl)) {
          setUrl(decodedUrl);
        } else {
          console.error("FullscreenProxy: Invalid URL format", decodedUrl);
          setError("Invalid URL format.");
        }
      } catch (error) {
        console.error("FullscreenProxy: Error decoding URL", error);
        setError("Error decoding the URL parameter.");
      }
    } else {
      console.error("FullscreenProxy: No URL parameter provided");
      setError("No URL parameter provided.");
    }

    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [location]);

  // Handle the "Escape" key to go back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.location.href = isSearch ? "/search" : "/apps-games";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearch]);

  // Determine the back button destination based on the source
  const getBackDestination = () => {
    return isSearch ? "/search" : "/apps-games";
  };

  return (
    <div className="h-screen w-screen bg-black flex flex-col">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="loading-spinner">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-red-500 text-white p-4 rounded-md max-w-md">
            <h3 className="font-bold mb-2">Error</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.href = getBackDestination()} 
              className="mt-4 bg-white text-red-500 px-4 py-2 rounded-md font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      )}
      
      {/* Small back button */}
      <div className="absolute top-4 left-4 z-50">
        <button 
          onClick={() => window.location.href = getBackDestination()} 
          className="bg-primary hover:bg-primary/80 text-white p-2 rounded-full shadow-lg"
          title={isSearch ? "Back to Search" : "Back to Apps & Games"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>
      
      {/* Fullscreen iframe */}
      {url && !isLoading && !error && (
        <>
          <div className="w-full h-full relative">
            <iframe 
              src={`/api/proxy?url=${encodeUrl(url)}`}
              className="fullscreen-iframe"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
              title="Fullscreen content"
              onLoad={() => console.log("Iframe loaded successfully")}
              onError={() => console.error("Iframe failed to load")}
            />
            
            {/* Fallback for iframe issues */}
            <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-70 text-white p-2 rounded text-sm">
              If content doesn't load, please click the back button and try again. 
              <button 
                onClick={() => {
                  // Force reload the iframe
                  const iframe = document.querySelector('iframe');
                  if (iframe) {
                    iframe.src = iframe.src;
                  }
                }}
                className="ml-2 bg-primary hover:bg-primary/80 px-2 py-1 rounded"
              >
                Reload
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}