
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import Index from "./pages/Index";
import HiringTemplates from "./pages/HiringTemplates";
import ResumeEditor from "./pages/ResumeEditor";
import NotFound from "./pages/NotFound";
import LoginSignup from "./pages/LoginSignup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ResumeProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/templates" element={<Navigate to="/hiring-templates" replace />} />
            <Route path="/hiring-templates" element={<HiringTemplates />} />
            <Route path="/editor/:templateId" element={<ResumeEditor />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ResumeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
