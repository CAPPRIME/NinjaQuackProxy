import { HTMLAttributes } from "react";
import { AppIcon } from "@/components/icons/AppIcons";

interface AppGameCardProps extends HTMLAttributes<HTMLDivElement> {
  id: string;
  name: string;
  description: string;
  onClick: () => void;
}

export default function AppGameCard({ 
  id, 
  name, 
  description, 
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
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 flex items-center justify-center bg-primary/10 rounded-md mr-3">
          <AppIcon name={id} size={24} />
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white">{name}</h3>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
  );
}