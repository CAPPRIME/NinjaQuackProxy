import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Proxy from "@/pages/Proxy";
import Search from "@/pages/Search";
import AppsGames from "@/pages/AppsGames";

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
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
