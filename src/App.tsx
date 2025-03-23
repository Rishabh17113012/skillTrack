
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CandidateProvider } from "./context/CandidateContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import CandidateForm from "./pages/CandidateForm";
import Dashboard from "./pages/Dashboard";
import RecruiterSearch from "./pages/RecruiterSearch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CandidateProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow pt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/candidate-form" element={<CandidateForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/recruiter-search" element={<RecruiterSearch />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </CandidateProvider>
  </QueryClientProvider>
);

export default App;
