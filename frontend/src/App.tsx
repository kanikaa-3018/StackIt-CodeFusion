// App.tsx
import { useEffect, useState } from "react";
import axios from "./api/axios";
import { setAccessToken } from "./utils/tokenManager";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/users/refresh_access_token",
          {},
          { withCredentials: true }
        );
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

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
