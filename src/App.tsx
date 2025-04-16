
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";
import RateTeachers from "./pages/student/RateTeachers";
import Suggestions from "./pages/student/Suggestions";

// Faculty pages
import FacultyDashboard from "./pages/faculty/Dashboard";
import Analytics from "./pages/faculty/Analytics";
import FeedbackPage from "./pages/faculty/Feedback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Student routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-dashboard/rate" element={<RateTeachers />} />
          <Route path="/student-dashboard/suggestions" element={<Suggestions />} />
          
          {/* Faculty routes */}
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/faculty-dashboard/analytics" element={<Analytics />} />
          <Route path="/faculty-dashboard/feedback" element={<FeedbackPage />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
