import React from "react";
import { 
  Youtube, 
  MessageCircle, 
  BookOpen, 
  Music, 
  MessageSquare, 
  PenSquare, 
  Mail, 
  Github, 
  Pin, 
  Video, 
  Languages, 
  Cloud, 
  Smartphone,
  Gamepad2,
  Trophy,
  Dices,
  ChevronRight,
  Box,
  Bird,
  Crown,
  Palette,
  Hammer,
  CircleEllipsis,
  Hash,
  Candy,
  Pencil
} from "lucide-react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const AppIcon: React.FC<IconProps> = ({ name, size = 24, className = "" }) => {
  // Function to safely render an icon
  const renderIcon = (IconComponent: React.ElementType) => {
    return <IconComponent size={size} />;
  };

  // Map of app/game IDs to their respective icons
  switch(name) {
    // Apps
    case 'youtube': 
      return <div className={`text-primary ${className}`}>{renderIcon(Youtube)}</div>;
    case 'discord': 
      return <div className={`text-primary ${className}`}>{renderIcon(MessageCircle)}</div>;
    case 'wikipedia': 
      return <div className={`text-primary ${className}`}>{renderIcon(BookOpen)}</div>;
    case 'spotify': 
      return <div className={`text-primary ${className}`}>{renderIcon(Music)}</div>;
    case 'reddit': 
      return <div className={`text-primary ${className}`}>{renderIcon(MessageSquare)}</div>;
    case 'twitter': 
      return <div className={`text-primary ${className}`}>{renderIcon(PenSquare)}</div>;
    case 'gmail': 
      return <div className={`text-primary ${className}`}>{renderIcon(Mail)}</div>;
    case 'github': 
      return <div className={`text-primary ${className}`}>{renderIcon(Github)}</div>;
    case 'pinterest': 
      return <div className={`text-primary ${className}`}>{renderIcon(Pin)}</div>;
    case 'twitch': 
      return <div className={`text-primary ${className}`}>{renderIcon(Video)}</div>;
    case 'duolingo': 
      return <div className={`text-primary ${className}`}>{renderIcon(Languages)}</div>;
    case 'weather': 
      return <div className={`text-primary ${className}`}>{renderIcon(Cloud)}</div>;
    case 'tiktok': 
      return <div className={`text-primary ${className}`}>{renderIcon(Smartphone)}</div>;
    
    // Games
    case 'slope': 
      return <div className={`text-primary ${className}`}>{renderIcon(Gamepad2)}</div>;
    case 'retrobowl': 
      return <div className={`text-primary ${className}`}>{renderIcon(Trophy)}</div>;
    case '2048': 
      return <div className={`text-primary ${className}`}>{renderIcon(Dices)}</div>;
    case 'crossyroad': 
      return <div className={`text-primary ${className}`}>{renderIcon(ChevronRight)}</div>;
    case 'flappybird': 
      return <div className={`text-primary ${className}`}>{renderIcon(Bird)}</div>;
    case 'chess': 
      return <div className={`text-primary ${className}`}>{renderIcon(Crown)}</div>;
    case 'tetris': 
      return <div className={`text-primary ${className}`}>{renderIcon(Palette)}</div>;
    case 'minecraft': 
      return <div className={`text-primary ${className}`}>{renderIcon(Hammer)}</div>;
    case 'snake': 
      return <div className={`text-primary ${className}`}>{renderIcon(CircleEllipsis)}</div>;
    case 'sudoku': 
      return <div className={`text-primary ${className}`}>{renderIcon(Hash)}</div>;
    case 'cookie-clicker': 
      return <div className={`text-primary ${className}`}>{renderIcon(Candy)}</div>;
    case 'wordle': 
      return <div className={`text-primary ${className}`}>{renderIcon(Pencil)}</div>;
    
    // Default fallback
    default:
      return <div className={`text-primary ${className}`}>{renderIcon(Box)}</div>;
  }
};