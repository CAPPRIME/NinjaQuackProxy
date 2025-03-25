import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface AdvancedOptionsProps {
  options: {
    removeScripts: boolean;
    removeAds: boolean;
    blockCookies: boolean;
  };
  onToggle: (name: keyof typeof options, value: boolean) => void;
}

const AdvancedOptions = ({ options, onToggle }: AdvancedOptionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAdvancedOptions = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mb-4">
      <button 
        onClick={toggleAdvancedOptions}
        className="flex items-center text-primary hover:text-primary/80 text-sm focus:outline-none"
      >
        <span className="material-icons text-sm mr-1">settings</span>
        Advanced Options
        <span className="material-icons text-sm ml-1">
          {isExpanded ? 'expand_less' : 'expand_more'}
        </span>
      </button>
      
      {isExpanded && (
        <div className="mt-3 p-3 bg-gray-50 rounded-md border border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="removeScripts" 
                checked={options.removeScripts}
                onCheckedChange={(checked) => onToggle('removeScripts', checked === true)}
              />
              <Label htmlFor="removeScripts" className="text-sm text-muted-foreground">
                Remove Scripts
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="removeAds" 
                checked={options.removeAds}
                onCheckedChange={(checked) => onToggle('removeAds', checked === true)}
              />
              <Label htmlFor="removeAds" className="text-sm text-muted-foreground">
                Block Ads
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="blockCookies" 
                checked={options.blockCookies}
                onCheckedChange={(checked) => onToggle('blockCookies', checked === true)}
              />
              <Label htmlFor="blockCookies" className="text-sm text-muted-foreground">
                Block Cookies
              </Label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;
