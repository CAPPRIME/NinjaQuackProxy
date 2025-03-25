import { useState } from "react";
import ProxyForm from "@/components/ProxyForm";
import StatusBar from "@/components/StatusBar";
import AdvancedOptions from "@/components/AdvancedOptions";
import ProxyBrowser from "@/components/ProxyBrowser";

const ProxyApp = () => {
  const [url, setUrl] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "connected" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("Ready to connect");
  const [error, setError] = useState<string | null>(null);
  const [proxyOptions, setProxyOptions] = useState({
    removeScripts: false,
    removeAds: false,
    blockCookies: false
  });

  const handleProxyRequest = async (inputUrl: string) => {
    // Reset error state
    setError(null);
    
    // Update URL and set loading state
    setUrl(inputUrl);
    setStatus("loading");
    setStatusMessage("Connecting...");
    
    try {
      // The actual proxying is handled by the server
      // The UI reflects the connection state
      setTimeout(() => {
        setStatus("connected");
        setStatusMessage(`Connected to ${inputUrl}`);
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Connection failed";
      setStatus("error");
      setStatusMessage("Connection failed");
      setError(errorMessage);
    }
  };

  const handleRetry = () => {
    if (url) {
      handleProxyRequest(url);
    }
  };

  const handleOptionChange = (name: keyof typeof proxyOptions, value: boolean) => {
    setProxyOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header Section */}
      <header className="mb-6 text-center">
        <div className="flex items-center justify-center mb-2">
          <span className="material-icons text-primary text-4xl mr-2">security</span>
          <h1 className="text-3xl font-medium text-foreground">Shadow Proxy</h1>
        </div>
        <p className="text-muted-foreground">Browse the web anonymously through our secure proxy service</p>
      </header>

      {/* Main Card Container */}
      <div className="bg-card rounded-lg shadow-md p-6 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <ProxyForm onSubmit={handleProxyRequest} isLoading={status === "loading"} />
        <StatusBar status={status} message={statusMessage} />
        <AdvancedOptions 
          options={proxyOptions}
          onToggle={handleOptionChange}
        />
      </div>
      
      <ProxyBrowser 
        url={url}
        isLoading={status === "loading"} 
        isConnected={status === "connected"}
        error={error}
        onRetry={handleRetry}
        proxyOptions={proxyOptions}
      />
      
      {/* Info Section */}
      <div className="mt-8 text-center text-muted-foreground text-sm">
        <p className="mb-2">Note: This proxy may not work with all websites due to technical limitations</p>
        <p>
          <span className="material-icons text-xs align-middle">shield</span>
          Your privacy is important to us. We don't store browsing history.
        </p>
      </div>
    </div>
  );
};

export default ProxyApp;
