import { useEffect, useState } from "react";
import axios from "./api/axios";
import { setAccessToken } from "./utils/tokenManager";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "./router/Router";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.post("/users/refresh_access_token", {}, { withCredentials: true });
        const token = res.data?.jwt_token;
        if (token) {
          setAccessToken(token);
        }
      } catch (err) {
        console.warn("Could not refresh access token:", err);
      } finally {
        setLoading(false);
      }
    };

    refreshToken();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
