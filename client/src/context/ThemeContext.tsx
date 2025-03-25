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
    
    // In a production app, you'd likely update a theme.json file on the server
    // or use CSS variables here to update the UI colors
    
    // Update document root with CSS variables for theme colors
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.primary);
    
    // Adjust border radius based on theme settings
    root.style.setProperty('--theme-radius', `${currentTheme.radius}rem`);
    
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