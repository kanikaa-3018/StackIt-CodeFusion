// import { useEffect, useState } from "react";
// import axios from "./api/axios";
// import { setAccessToken } from "./utils/tokenManager";
// import Router from "./router/Router";

// const App = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const refreshToken = async () => {
//       try {
//         const res = await axios.post("/refresh_access_token", {}, { withCredentials: true });

//         const token = res.data?.jwt_token;
//         if (token) {
//           setAccessToken(token);
//         }
//       } catch (err) {
//         console.warn("Could not refresh access token:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     refreshToken();
//   }, []);

//   if (loading) return <div>Loading...</div>;

//   return <Router />;
// };

// export default App;

// App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";  // remove BrowserRouter import
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* No <BrowserRouter> here: it’s already in main.tsx */}
      <Routes>
        <Route path="/" element={<Index />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

