import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { encodeUrl, decodeUrl, isValidUrl } from "@/lib/proxy-utils";

export default function FullscreenProxy() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [location] = useLocation();

  // Parse URL from query parameters on initial load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedUrl = params.get("url");
    
    if (encodedUrl) {
      try {
        const decodedUrl = decodeUrl(encodedUrl);
        if (isValidUrl(decodedUrl)) {
          setUrl(decodedUrl);
        } else {
          setError("Invalid URL format.");
        }
      } catch (error) {
        setError("Error decoding the URL parameter.");
      }
    }

    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [location]);

  // Handle the "Escape" key to go back to the Apps & Games page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        window.location.href = "/apps-games";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-black flex flex-col">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
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
              onClick={() => window.location.href = "/apps-games"} 
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
          onClick={() => window.location.href = "/apps-games"} 
          className="bg-primary hover:bg-primary/80 text-white p-2 rounded-full shadow-lg"
          title="Back to Apps & Games"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>
      
      {/* Fullscreen iframe */}
      {url && !isLoading && !error && (
        <iframe 
          src={`/api/proxy?url=${encodeUrl(url)}`}
          className="w-full h-full border-none"
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
          title="Fullscreen content"
        ></iframe>
      )}
    </div>
  );
}