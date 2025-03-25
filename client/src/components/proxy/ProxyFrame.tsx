import { useEffect, useRef } from "react";

interface ProxyFrameProps {
  url: string;
  isLoading: boolean;
}

export default function ProxyFrame({ url, isLoading }: ProxyFrameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Reset iframe when URL changes
  useEffect(() => {
    if (iframeRef.current && url) {
      iframeRef.current.src = url;
    }
  }, [url]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="loading-spinner">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        </div>
      )}
      
      {/* Empty State */}
      {!url && !isLoading && (
        <div className="text-center py-24 px-6">
          <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6">
            <svg className="h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4a8 8 0 018 8 8 8 0 01-8 8 8 8 0 01-8-8 8 8 0 018-8z" />
            </svg>
          </div>
          <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Enter a URL to start browsing</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Browse the web anonymously through our secure proxy. Your browsing activity 
            stays private and your identity protected.
          </p>
        </div>
      )}
      
      {/* Proxy iframe */}
      {url && !isLoading && (
        <iframe 
          ref={iframeRef}
          id="proxy-frame" 
          className="proxy-frame h-[calc(100vh-12rem)] w-full border-none rounded-lg bg-white"
          src={url}
          sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
          title="Proxied content"
        ></iframe>
      )}
    </div>
  );
}
