import React from "react";
import { useTheme, themePresets } from "../../context/ThemeContext";
import { Button } from "../ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "../ui/dropdown-menu";
import { Palette } from "lucide-react";

export default function ThemeSelector() {
  const { themeName, setThemeName, setAppearance, currentTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Palette className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Color Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Theme options */}
        {Object.entries(themePresets).map(([name, theme]) => (
          <DropdownMenuItem
            key={name}
            onClick={() => setThemeName(name as keyof typeof themePresets)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: theme.primary }}
            />
            <span className={themeName === name ? "font-bold" : ""}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </span>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Appearance options */}
        <DropdownMenuItem onClick={() => setAppearance("light")}>
          <span className={currentTheme.appearance === "light" ? "font-bold" : ""}>
            Light
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAppearance("dark")}>
          <span className={currentTheme.appearance === "dark" ? "font-bold" : ""}>
            Dark
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setAppearance("system")}>
          <span className={currentTheme.appearance === "system" ? "font-bold" : ""}>
            System
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}