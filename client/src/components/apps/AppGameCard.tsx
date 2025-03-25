import { HTMLAttributes } from "react";

interface AppGameCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  description: string;
  icon: string;
  onClick: () => void;
}

export default function AppGameCard({ 
  name, 
  description, 
  icon, 
  onClick,
  className = "",
  ...props 
}: AppGameCardProps) {
  return (
    <div 
      className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer ${className}`}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-center mb-2">
        <div className="text-2xl mr-2">{icon}</div>
        <h3 className="font-bold text-gray-900 dark:text-white">{name}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}