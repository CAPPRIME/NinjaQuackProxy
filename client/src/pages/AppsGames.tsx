import { useState } from "react";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppGameCard from "@/components/apps/AppGameCard";
import { appsAndGames, getByCategory } from "@/data/apps-games";
import { encodeUrl } from "@/lib/proxy-utils";
import { openInBlankTab } from "@/lib/blank-tab";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBackground } from "@/context/BackgroundContext";

export default function AppsGames() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<"apps" | "games">("apps");
  const { applyBackgroundStyles } = useBackground();
  
  const apps = getByCategory("app");
  const games = getByCategory("game");
  
  const handleOpenItem = (url: string) => {
    // Encode the URL and navigate to the fullscreen proxy page with source=apps
    const encodedUrl = encodeUrl(url);
    setLocation(`/fullscreen?url=${encodedUrl}&source=apps`);
  };

  return (
    <div className="min-h-screen py-8" style={applyBackgroundStyles()}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
          Apps & Games
        </h1>
      
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1"></div>
          <Button 
            onClick={openInBlankTab}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 border-primary text-primary hover:bg-primary/10"
          >
            <ExternalLink size={14} />
            Open in about:blank Tab
          </Button>
        </div>
        
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
                  id={app.id}
                  name={app.name}
                  description={app.description}
                  icon={app.icon || ""}
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
                  id={game.id}
                  name={game.name}
                  description={game.description}
                  icon={game.icon || ""}
                  onClick={() => handleOpenItem(game.url)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}