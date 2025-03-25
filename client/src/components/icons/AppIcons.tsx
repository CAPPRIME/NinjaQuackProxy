import React from "react";
import { 
  Youtube, 
  MessageCircle, 
  BookOpen, 
  Music, 
  MessageSquare, 
  SquarePen, 
  Mail, 
  Github, 
  BadgeAlert, 
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
  const iconMap: Record<string, React.ReactNode> = {
    // Apps
    youtube: <Youtube size={size} />,
    discord: <MessageCircle size={size} />,
    wikipedia: <BookOpen size={size} />,
    spotify: <Music size={size} />,
    reddit: <MessageSquare size={size} />,
    twitter: <SquarePen size={size} />,
    gmail: <Mail size={size} />,
    github: <Github size={size} />,
    pinterest: <BadgeAlert size={size} />,
    twitch: <Video size={size} />,
    duolingo: <Languages size={size} />,
    weather: <Cloud size={size} />,
    tiktok: <Smartphone size={size} />,
    
    // Games
    slope: <Gamepad2 size={size} />,
    retrobowl: <Trophy size={size} />,
    "2048": <Dices size={size} />,
    crossyroad: <ChevronRight size={size} />,
    flappybird: <Bird size={size} />,
    chess: <King size={size} />,
    tetris: <Palette size={size} />,
    minecraft: <Hammer size={size} />,
    snake: <CircleEllipsis size={size} />,
    sudoku: <Hash size={size} />,
    "cookie-clicker": <Candy size={size} />,
    wordle: <Pencil size={size} />
  };

  return (
    <div className={`text-primary ${className}`}>
      {iconMap[name] || <Box size={size} />}
    </div>
  );
};