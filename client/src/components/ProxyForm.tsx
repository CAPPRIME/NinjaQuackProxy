import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProxyFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const ProxyForm = ({ onSubmit, isLoading }: ProxyFormProps) => {
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrlInput(e.target.value);
    setUrlError(null);
  };

  const isValidUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = urlInput.trim();
    
    if (!isValidUrl(url)) {
      setUrlError("Please enter a valid URL including https:// or http://");
      return;
    }
    
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col md:flex-row gap-3">
        {/* URL Input */}
        <div className="flex-grow relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-icons text-muted-foreground">public</span>
          </div>
          <Input
            type="url"
            className="w-full pl-10 pr-4"
            placeholder="Enter URL (e.g., https://example.com)"
            value={urlInput}
            onChange={handleUrlChange}
            disabled={isLoading}
            required
          />
        </div>
        
        {/* Submit Button */}
        <Button 
          type="submit" 
          disabled={isLoading}
          className="bg-primary hover:bg-primary/80 text-primary-foreground px-6"
        >
          <span className="material-icons mr-1">vpn_lock</span>
          <span>Connect</span>
        </Button>
      </div>
      
      {/* URL Validation Error */}
      {urlError && (
        <div className="mt-2 text-destructive text-sm">
          {urlError}
        </div>
      )}
    </form>
  );
};

export default ProxyForm;
