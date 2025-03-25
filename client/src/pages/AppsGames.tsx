import { useState } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppGameCard from "@/components/apps/AppGameCard";
import { appsAndGames, getByCategory } from "@/data/apps-games";

export default function AppsGames() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"apps" | "games">("apps");
  
  const apps = getByCategory("app");
  const games = getByCategory("game");
  
  const handleOpenItem = (url: string) => {
    // Encode the URL and navigate to the proxy page
    const encodedUrl = encodeURIComponent(btoa(url));
    setLocation(`/proxy?url=${encodedUrl}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Apps & Games
      </h1>
      
      <Tabs defaultValue="apps" className="w-full" onValueChange={(value) => setActiveTab(value as "apps" | "games")}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="apps">Apps</TabsTrigger>
          <TabsTrigger value="games">Games</TabsTrigger>
        </TabsList>
        
        <TabsContent value="apps" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {apps.map((app) => (
              <AppGameCard
                key={app.id}
                name={app.name}
                description={app.description}
                icon={app.icon}
                onClick={() => handleOpenItem(app.url)}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="games" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map((game) => (
              <AppGameCard
                key={game.id}
                name={game.name}
                description={game.description}
                icon={game.icon}
                onClick={() => handleOpenItem(game.url)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}