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
  Pencil,
  Building2,
  Blocks,
  Target,
  Car,
  Truck,
  RectangleHorizontal,
  Egg,
  Dog,
  Rocket,
  Sparkles,
  Anchor,
  Boxes,
  Mountain,
  Footprints,
  Circle,
  Square,
  CarFront,
  UtensilsCrossed,
  Train,
  Baby,
  Plane,
  House,
  Footprints as Shoe,
  Atom,
  TowerControl,
  Cat,
  Backpack,
  User,
  Shield,
  BookCopy,
  Gamepad,
  Binary
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
    // New apps
    case 'fortnitegg': 
      return <div className={`text-primary ${className}`}>{renderIcon(Backpack)}</div>;
    case 'monkeygg2': 
      return <div className={`text-primary ${className}`}>{renderIcon(User)}</div>;
    case 'virlan': 
      return <div className={`text-primary ${className}`}>{renderIcon(Gamepad)}</div>;
    case 'kodub': 
      return <div className={`text-primary ${className}`}>{renderIcon(BookCopy)}</div>;
    case 'xbox-cloud': 
      return <div className={`text-primary ${className}`}>{renderIcon(Cloud)}</div>;
    
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
    // New games
    case '1v1-lol-old': 
      return <div className={`text-primary ${className}`}>{renderIcon(Building2)}</div>;
    case 'build-now-gg': 
      return <div className={`text-primary ${className}`}>{renderIcon(Blocks)}</div>;
    case '1v1-lol': 
      return <div className={`text-primary ${className}`}>{renderIcon(Target)}</div>;
    case 'escape-road': 
      return <div className={`text-primary ${className}`}>{renderIcon(Car)}</div>;
    case 'escape-road-2': 
      return <div className={`text-primary ${className}`}>{renderIcon(Truck)}</div>;
    case 'polytrack': 
      return <div className={`text-primary ${className}`}>{renderIcon(RectangleHorizontal)}</div>;
    case 'eggy-car': 
      return <div className={`text-primary ${className}`}>{renderIcon(Egg)}</div>;
    case 'dogeminer': 
      return <div className={`text-primary ${className}`}>{renderIcon(Dog)}</div>;
    case 'dogeminer-2': 
      return <div className={`text-primary ${className}`}>{renderIcon(Rocket)}</div>;
    case 'space-waves': 
      return <div className={`text-primary ${className}`}>{renderIcon(Sparkles)}</div>;
    case 'stickman-hook': 
      return <div className={`text-primary ${className}`}>{renderIcon(Anchor)}</div>;
    case 'blockpost': 
      return <div className={`text-primary ${className}`}>{renderIcon(Boxes)}</div>;
    case 'rooftop-snipers': 
      return <div className={`text-primary ${className}`}>{renderIcon(Shield)}</div>;
    case 'getaway-shootout': 
      return <div className={`text-primary ${className}`}>{renderIcon(Target)}</div>;
    case 'snowrider': 
      return <div className={`text-primary ${className}`}>{renderIcon(Mountain)}</div>;
    case 'stompedio': 
      return <div className={`text-primary ${className}`}>{renderIcon(Footprints)}</div>;
    case 'coreball': 
      return <div className={`text-primary ${className}`}>{renderIcon(Circle)}</div>;
    case 'geometry-dash': 
      return <div className={`text-primary ${className}`}>{renderIcon(Square)}</div>;
    case 'drive-mad': 
      return <div className={`text-primary ${className}`}>{renderIcon(CarFront)}</div>;
    case 'burrito-bison': 
      return <div className={`text-primary ${className}`}>{renderIcon(UtensilsCrossed)}</div>;
    case 'subway-surfers': 
      return <div className={`text-primary ${className}`}>{renderIcon(Train)}</div>;
    case 'bitlife': 
      return <div className={`text-primary ${className}`}>{renderIcon(Baby)}</div>;
    case 'bitplanes': 
      return <div className={`text-primary ${className}`}>{renderIcon(Plane)}</div>;
    case 'rodeo-stampede': 
      return <div className={`text-primary ${className}`}>{renderIcon(House)}</div>;
    case 'run-3': 
      return <div className={`text-primary ${className}`}>{renderIcon(Shoe)}</div>;
    case 'tunnel-rush': 
      return <div className={`text-primary ${className}`}>{renderIcon(Atom)}</div>;
    case 'rocket-bot-royale': 
      return <div className={`text-primary ${className}`}>{renderIcon(TowerControl)}</div>;
    case 'monkey-mart': 
      return <div className={`text-primary ${className}`}>{renderIcon(Cat)}</div>;
    case 'super-liquid-soccer': 
      return <div className={`text-primary ${className}`}>{renderIcon(Circle)}</div>;
    
    // Default fallback
    default:
      return <div className={`text-primary ${className}`}>{renderIcon(Box)}</div>;
  }
};