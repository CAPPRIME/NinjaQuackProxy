import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import ProxyApp from "@/components/ProxyApp";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProxyApp />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
