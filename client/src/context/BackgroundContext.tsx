import React, { createContext, useState, useContext, useEffect } from 'react';

export interface Background {
  id: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  type: 'color' | 'image' | 'gradient';
}

// Background options - these include colors, gradients, and image backgrounds
export const backgroundOptions: Background[] = [
  // Default
  {
    id: 'default',
    name: 'Default',
    url: '',
    thumbnailUrl: '',
    type: 'color'
  },
  // Colors
  {
    id: 'purple',
    name: 'Purple',
    url: '#4a0d80',
    thumbnailUrl: '#4a0d80',
    type: 'color'
  },
  {
    id: 'dark-blue',
    name: 'Dark Blue',
    url: '#0d3b66',
    thumbnailUrl: '#0d3b66',
    type: 'color'
  },
  {
    id: 'black',
    name: 'Black',
    url: '#121212',
    thumbnailUrl: '#121212',
    type: 'color'
  },
  {
    id: 'midnight',
    name: 'Midnight',
    url: '#0f172a',
    thumbnailUrl: '#0f172a',
    type: 'color'
  },
  // Gradients
  {
    id: 'purple-gradient',
    name: 'Purple Gradient',
    url: 'linear-gradient(to right, #4a0d80, #7928ca)',
    thumbnailUrl: 'linear-gradient(to right, #4a0d80, #7928ca)',
    type: 'gradient'
  },
  {
    id: 'blue-gradient',
    name: 'Blue Gradient',
    url: 'linear-gradient(to right, #0d3b66, #2563eb)',
    thumbnailUrl: 'linear-gradient(to right, #0d3b66, #2563eb)',
    type: 'gradient'
  },
  {
    id: 'synthwave',
    name: 'Synthwave',
    url: 'linear-gradient(to right, #ff1cf7, #751aff)',
    thumbnailUrl: 'linear-gradient(to right, #ff1cf7, #751aff)',
    type: 'gradient'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    url: 'linear-gradient(to right, #ff4e50, #f9d423)',
    thumbnailUrl: 'linear-gradient(to right, #ff4e50, #f9d423)',
    type: 'gradient'
  },
  // Images - using abstract patterns to avoid distracting background images
  {
    id: 'abstract-1',
    name: 'Abstract Pattern',
    url: 'radial-gradient(circle at 50% 50%, rgba(74, 13, 128, 0.1) 0%, rgba(0, 0, 0, 0) 70%), repeating-linear-gradient(45deg, rgba(74, 13, 128, 0.05) 0px, rgba(74, 13, 128, 0.05) 2px, transparent 2px, transparent 10px)',
    thumbnailUrl: 'radial-gradient(circle at 50% 50%, rgba(74, 13, 128, 0.1) 0%, rgba(0, 0, 0, 0) 70%), repeating-linear-gradient(45deg, rgba(74, 13, 128, 0.05) 0px, rgba(74, 13, 128, 0.05) 2px, transparent 2px, transparent 10px)',
    type: 'image'
  },
  {
    id: 'abstract-2',
    name: 'Dotted Pattern',
    url: 'radial-gradient(circle, rgba(74, 13, 128, 0.1) 2px, transparent 2px), radial-gradient(circle, rgba(74, 13, 128, 0.1) 2px, transparent 2px)',
    thumbnailUrl: 'radial-gradient(circle, rgba(74, 13, 128, 0.1) 2px, transparent 2px), radial-gradient(circle, rgba(74, 13, 128, 0.1) 2px, transparent 2px)',
    type: 'image'
  }
];

interface BackgroundContextType {
  currentBackground: Background;
  setBackground: (backgroundId: string) => void;
  applyBackgroundStyles: () => React.CSSProperties;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentBackground, setCurrentBackground] = useState<Background>(() => {
    const savedBackground = localStorage.getItem('ninjaQuack-background');
    const defaultBackground = backgroundOptions[0]; // Default background
    
    if (savedBackground) {
      const found = backgroundOptions.find(bg => bg.id === savedBackground);
      return found || defaultBackground;
    }
    
    return defaultBackground;
  });

  // Save the chosen background to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ninjaQuack-background', currentBackground.id);
  }, [currentBackground]);

  const setBackground = (backgroundId: string) => {
    const newBackground = backgroundOptions.find(bg => bg.id === backgroundId);
    if (newBackground) {
      setCurrentBackground(newBackground);
    }
  };

  // Generate the CSS styles for the current background
  const applyBackgroundStyles = (): React.CSSProperties => {
    if (currentBackground.id === 'default') {
      return {}; // No background styling for default
    }

    const isDarkBackground = ['purple', 'dark-blue', 'black', 'midnight', 'purple-gradient', 'blue-gradient', 'synthwave'].includes(currentBackground.id);
    
    // Common text styling properties for readability
    const textStyles = isDarkBackground 
      ? { color: 'rgba(255, 255, 255, 0.9)', textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }
      : { color: 'rgba(0, 0, 0, 0.9)', textShadow: '0 1px 2px rgba(255, 255, 255, 0.3)' };
      
    switch (currentBackground.type) {
      case 'color':
        return { 
          backgroundColor: currentBackground.url,
          ...textStyles
        };
      case 'gradient':
        return { 
          background: currentBackground.url,
          ...textStyles
        };
      case 'image':
        return { 
          background: currentBackground.url,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          ...textStyles
        };
      default:
        return {};
    }
  };

  const contextValue: BackgroundContextType = {
    currentBackground,
    setBackground,
    applyBackgroundStyles
  };

  return (
    <BackgroundContext.Provider value={contextValue}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};