import React from 'react';
import { 
  MessageSquare, Play, Film, Beaker, ShieldCheck, 
  PenTool, ChevronsUp, Mountain, Music, Coffee, 
  Book, Mail, Github, Bookmark, Zap, Languages, 
  Cloud, Smartphone, Package, School, Gamepad2, 
  Rocket, Database, Bolt, Sword, PinIcon, 
  Radio, Folder, Video, PieChart, Map, Flag,
  Compass, Target, type LucideIcon, Search, Share2, 
  Box, Monitor, Truck, Gamepad, Dices, Car
} from 'lucide-react';

interface AppIconProps {
  name: string;
  size?: number;
  className?: string;
}

// Map each app/game ID to a specific icon
const iconMap: Record<string, LucideIcon> = {
  // Apps
  'incognito-proxy': ShieldCheck,
  '123movies': Film,
  'totally-science': Beaker,
  'ninja-chat': MessageSquare,
  'youtube': Video,
  'discord': MessageSquare,
  'wikipedia': Book,
  'spotify': Music,
  'reddit': PieChart,
  'twitter': Share2,
  'gmail': Mail,
  'github': Github,
  'pinterest': PinIcon,
  'twitch': Radio,
  'duolingo': Languages,
  'weather': Cloud,
  'tiktok': Smartphone,
  'fortnitegg': Target,
  'monkeygg2': Package,
  'virlan': Compass,
  'kodub': School,
  'xbox-cloud': Gamepad2,
  
  // Games
  'smash-karts': Car,
  'block-blast': Database,
  'fortnite-cloud': Sword,
  'tiny-fishing': PenTool,
  'yohoho-io': Flag,
  'ovo': Package,
  'chill-guy-clicker': Coffee,
  'moto-x3m': Bolt,
  'moto-x3m-2': Bolt,
  'moto-x3m-3': Bolt,
  'hole-io': Box,
  'territorial': Map,
  'tomb-of-the-mask': Package,
  'we-become-what-we-behold': Monitor,
  'temple-of-boom': Mountain,
  'basket-random': Gamepad,
  'soccer-random': Gamepad,
  'volleyball-random': Gamepad,
  'boxing-random': Gamepad,
  'drift-boss': Car,
  '10-minutes-till-dawn': Zap,
  'bloxd-io': Box,
  'shell-shockers': Target,
  'basket-legends': Play,
  'basket-bros': Play,
  'level-devil': ChevronsUp,
  'infinite-craft': Beaker,
  'cluster-rush': Truck,
  'tanuki-sunset': Car,
  'slope': Mountain,
  'retrobowl': Play,
  '2048': Dices,
  'crossyroad': Car,
  'flappybird': Rocket,
  'chess': Dices,
  'tetris': Box,
  'minecraft': Box,
  'snake': Share2,
  'sudoku': Dices,
  'cookie-clicker': Package,
  'wordle': Book,
  '1v1-lol-old': Sword,
  'build-now-gg': Box,
  '1v1-lol': Sword,
  'escape-road': Car,
  'escape-road-2': Car,
  'polytrack': Car,
  'eggy-car': Car,
  'dogeminer': Database,
  'dogeminer-2': Rocket,
  'space-waves': Rocket,
  'stickman-hook': Gamepad,
  'blockpost': Box,
  'rooftop-snipers': Target,
  'getaway-shootout': Sword,
  'snowrider': Mountain,
  'stompedio': Play,
  'coreball': Play,
  'geometry-dash': Box,
  'drive-mad': Car,
  'burrito-bison': Gamepad,
  'subway-surfers': Bolt,
  'bitlife': PieChart,
  'bitplanes': Rocket,
  'rodeo-stampede': Play,
  'run-3': Bolt,
  'tunnel-rush': Bolt,
  'rocket-bot-royale': Rocket,
  'monkey-mart': Package,
  'super-liquid-soccer': Play,
  // Default fallback
  'default': Gamepad
};

export const AppIcon: React.FC<AppIconProps> = ({ name, size = 24, className = "" }) => {
  // Get the icon component from the map, or use a default if not found
  const IconComponent = iconMap[name] || iconMap['default'];
  
  return (
    <IconComponent size={size} className={className} />
  );
};

export default AppIcon;