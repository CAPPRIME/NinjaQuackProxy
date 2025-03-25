import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Proxy from "@/pages/Proxy";
import Search from "@/pages/Search";
import AppsGames from "@/pages/AppsGames";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeSelector from "./components/theme/ThemeSelector";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/proxy" component={Proxy} />
      <Route path="/search" component={Search} />
      <Route path="/apps-games" component={AppsGames} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="fixed top-4 right-4 z-50">
          <ThemeSelector />
        </div>
        <Router />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
