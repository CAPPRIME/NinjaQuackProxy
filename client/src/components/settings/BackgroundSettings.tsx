import React from 'react';
import { useBackground, backgroundOptions } from '@/context/BackgroundContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

export function BackgroundSettings() {
  const { currentBackground, setBackground } = useBackground();

  const handleBackgroundChange = (backgroundId: string) => {
    setBackground(backgroundId);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Choose Background</h3>
            <p className="text-sm text-muted-foreground">
              Customize your browsing background with colors, gradients, or patterns.
            </p>
          </div>
          
          <Select
            value={currentBackground.id}
            onValueChange={handleBackgroundChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a background" />
            </SelectTrigger>
            <SelectContent>
              {backgroundOptions.map((bg) => (
                <SelectItem key={bg.id} value={bg.id}>
                  {bg.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-medium">Preview</h3>
            <p className="text-sm text-muted-foreground">
              Preview of your selected background.
            </p>
          </div>
          
          <Card className="overflow-hidden border">
            <CardContent className="p-0">
              <div
                className="h-40 w-full"
                style={(() => {
                  if (currentBackground.id === 'default') {
                    return { background: 'var(--background)' };
                  }
                  
                  if (currentBackground.type === 'color') {
                    return { backgroundColor: currentBackground.url };
                  }
                  
                  if (currentBackground.type === 'gradient') {
                    return { background: currentBackground.url };
                  }
                  
                  // Image type
                  return { 
                    background: currentBackground.url,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat'
                  };
                })()}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="text-sm text-muted-foreground mt-6">
        <p>The background will be applied to all pages in the application.</p>
      </div>
    </div>
  );
}