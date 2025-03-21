
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider } from "./context/AuthContext";
import { isAuthenticated } from "./services/api";
import Index from "./pages/Index";
import HiringTemplates from "./pages/HiringTemplates";
import ResumeEditor from "./pages/ResumeEditor";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LoginSignup from "./pages/LoginSignup";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <ResumeProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/templates" element={<Navigate to="/hiring-templates" replace />} />
              <Route path="/hiring-templates" element={<HiringTemplates />} />
              <Route path="/editor/:templateId" element={
                <ProtectedRoute>
                  <ResumeEditor />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/login" element={<LoginSignup />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ResumeProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
