import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ProxyBrowserProps {
  url: string;
  isLoading: boolean;
  isConnected: boolean;
  error: string | null;
  onRetry: () => void;
  proxyOptions: {
    removeScripts: boolean;
    removeAds: boolean;
    blockCookies: boolean;
  };
}

const ProxyBrowser = ({ 
  url, 
  isLoading, 
  isConnected,
  error, 
  onRetry, 
  proxyOptions 
}: ProxyBrowserProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [proxyContent, setProxyContent] = useState<string | null>(null);

  const { mutate: fetchProxiedContent, isPending } = useMutation({
    mutationFn: async (targetUrl: string) => {
      const response = await apiRequest('POST', '/api/proxy', {
        url: targetUrl,
        options: proxyOptions
      });
      return response.text();
    },
    onSuccess: (data) => {
      setProxyContent(data);
    },
    onError: (err) => {
      console.error('Proxy error:', err);
    }
  });

  useEffect(() => {
    if (isConnected && url) {
      fetchProxiedContent(url);
    }
  }, [isConnected, url, fetchProxiedContent]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const refreshProxy = () => {
    if (url) {
      fetchProxiedContent(url);
    }
  };

  return (
    <div className={`bg-card rounded-lg shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Browser Header */}
      <div className="flex items-center justify-between p-3 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center flex-1 mr-2">
          <button 
            onClick={refreshProxy} 
            className="p-1 rounded-full hover:bg-gray-200 mr-2"
            disabled={!url || isLoading || isPending}
          >
            <span className="material-icons text-muted-foreground">refresh</span>
          </button>
          <div className="bg-white flex items-center rounded-md px-3 py-1 border border-gray-300 text-sm text-muted-foreground w-full">
            <span className="material-icons text-sm mr-1">lock</span>
            <span className="truncate">
              {url || "Not connected"}
            </span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleFullscreen}
          className="p-1 rounded-full hover:bg-gray-200"
        >
          <span className="material-icons text-muted-foreground">
            {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
          </span>
        </Button>
      </div>
      
      {/* Loading Overlay */}
      {(isLoading || isPending) && (
        <div className="relative bg-white">
          <div className="absolute inset-0 flex items-center justify-center min-h-[70vh]">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
          </div>
        </div>
      )}
      
      {/* Error Display */}
      {error && !isLoading && (
        <div className="p-8 text-center min-h-[70vh] flex flex-col items-center justify-center">
          <span className="material-icons text-destructive text-4xl mb-3">error_outline</span>
          <h3 className="text-lg font-medium text-foreground mb-2">Connection Error</h3>
          <p className="text-muted-foreground mb-4">
            {error}
          </p>
          <Button 
            onClick={onRetry}
            className="bg-primary hover:bg-primary/80 text-primary-foreground"
          >
            <span className="material-icons mr-1">refresh</span>
            Retry Connection
          </Button>
        </div>
      )}
      
      {/* Initial Empty State */}
      {!url && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center p-10 min-h-[70vh] text-center">
          <span className="material-icons text-gray-300 text-6xl mb-4">language</span>
          <h3 className="text-xl font-medium text-foreground mb-2">Enter a URL to get started</h3>
          <p className="text-muted-foreground max-w-md">
            Type a website address in the field above and click Connect to browse anonymously through our proxy
          </p>
        </div>
      )}
      
      {/* Proxy Frame */}
      {isConnected && proxyContent && !isLoading && !error && !isPending && (
        <div className="min-h-[70vh] w-full">
          <iframe 
            className="w-full h-full min-h-[70vh] border border-border"
            sandbox="allow-same-origin allow-scripts allow-forms"
            title="Proxied content"
            srcDoc={proxyContent}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default ProxyBrowser;
