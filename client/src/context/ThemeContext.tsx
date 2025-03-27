import React, { createContext, useContext, useEffect, useState } from "react";

// Theme options
type ThemeVariant = "vibrant" | "professional" | "tint";
type AppearanceMode = "light" | "dark" | "system";

export interface ThemeOptions {
  primary: string;
  variant: ThemeVariant;
  appearance: AppearanceMode;
  radius: number;
}

// Predefined themes
export const themePresets = {
  purple: {
    primary: "#4a0d80",
    variant: "vibrant" as ThemeVariant,
    appearance: "system" as AppearanceMode,
    radius: 0.5
  },
  ocean: {
    primary: "#0077b6",
    variant: "tint" as ThemeVariant,
    appearance: "system" as AppearanceMode,
    radius: 0.5
  },
  forest: {
    primary: "#2d6a4f",
    variant: "professional" as ThemeVariant,
    appearance: "system" as AppearanceMode,
    radius: 0.5
  },
  sunset: {
    primary: "#e85d04",
    variant: "vibrant" as ThemeVariant,
    appearance: "system" as AppearanceMode,
    radius: 0.5
  },
  ruby: {
    primary: "#d00000",
    variant: "tint" as ThemeVariant,
    appearance: "system" as AppearanceMode,
    radius: 0.5
  }
};

type ThemeNames = keyof typeof themePresets;

interface ThemeContextType {
  currentTheme: ThemeOptions;
  themeName: ThemeNames;
  setThemeName: (name: ThemeNames) => void;
  setAppearance: (mode: AppearanceMode) => void;
  setCustomTheme: (options: Partial<ThemeOptions>) => void;
}

const defaultContext: ThemeContextType = {
  currentTheme: themePresets.purple,
  themeName: "purple",
  setThemeName: () => {},
  setAppearance: () => {},
  setCustomTheme: () => {}
};

export const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState<ThemeNames>("purple");
  const [currentTheme, setCurrentTheme] = useState<ThemeOptions>(themePresets.purple);

  // Apply theme to DOM
  useEffect(() => {
    // Create a theme.json string
    const themeJson = JSON.stringify(currentTheme, null, 2);
    
    // In a real app, we might save this to local storage or a user profile
    localStorage.setItem("ninjaQuack-theme", themeJson);
    
    // For demonstration, log the current theme
    console.log("Theme updated:", currentTheme);
    
    // Get the primary color and convert to HSL
    const hexToHSL = (hex: string) => {
      // Remove the # if present
      hex = hex.replace('#', '');
      
      // Convert hex to RGB
      let r = parseInt(hex.substring(0, 2), 16) / 255;
      let g = parseInt(hex.substring(2, 4), 16) / 255;
      let b = parseInt(hex.substring(4, 6), 16) / 255;
      
      // Find greatest and smallest channel values
      let cmin = Math.min(r, g, b);
      let cmax = Math.max(r, g, b);
      let delta = cmax - cmin;
      let h = 0;
      let s = 0;
      let l = 0;
      
      // Calculate hue
      if (delta === 0) {
        h = 0;
      } else if (cmax === r) {
        h = ((g - b) / delta) % 6;
      } else if (cmax === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }
      
      h = Math.round(h * 60);
      if (h < 0) h += 360;
      
      // Calculate lightness
      l = (cmax + cmin) / 2;
      
      // Calculate saturation
      s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
      
      // Convert to percentage
      s = +(s * 100).toFixed(1);
      l = +(l * 100).toFixed(1);
      
      return { h, s, l };
    };
    
    const hsl = hexToHSL(currentTheme.primary);
    const hslString = `${hsl.h} ${hsl.s}% ${hsl.l}%`;
    
    // Update document root with CSS variables for theme colors
    const root = document.documentElement;
    
    // Set the primary color in HSL format for compatibility with Tailwind
    root.style.setProperty('--primary', hslString);
    root.style.setProperty('--primary-foreground', '0 0% 100%');
    
    // Set accent color based on primary with slight variation
    root.style.setProperty('--accent', `${(hsl.h + 30) % 360} ${hsl.s}% ${hsl.l}%`);
    root.style.setProperty('--accent-foreground', '0 0% 100%');
    
    // Direct hex color for elements that don't use HSL
    root.style.setProperty('--theme-primary-hex', currentTheme.primary);
    
    // Adjust border radius based on theme settings
    root.style.setProperty('--radius', `${currentTheme.radius}rem`);
    
    // Handle appearance (light/dark/system)
    if (currentTheme.appearance === "system") {
      root.classList.remove("dark", "light");
      // Add class based on system preference
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        root.classList.add("dark");
      } else {
        root.classList.add("light");
      }
    } else {
      root.classList.remove("dark", "light");
      root.classList.add(currentTheme.appearance);
    }
  }, [currentTheme]);

  // Handle theme selection
  const handleThemeChange = (name: ThemeNames) => {
    setThemeName(name);
    setCurrentTheme(themePresets[name]);
  };

  // Set appearance only
  const setAppearance = (mode: AppearanceMode) => {
    setCurrentTheme(prev => ({ ...prev, appearance: mode }));
  };

  // Set custom theme options
  const setCustomTheme = (options: Partial<ThemeOptions>) => {
    setThemeName("purple"); // Reset to default name as we're customizing
    setCurrentTheme(prev => ({ ...prev, ...options }));
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeName,
        setThemeName: handleThemeChange,
        setAppearance,
        setCustomTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};