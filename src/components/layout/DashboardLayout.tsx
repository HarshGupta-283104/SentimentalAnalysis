
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  BookOpen, 
  ChevronDown,
  GraduationCap,
  Home,
  LogOut,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "student" | "faculty";
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);

  const handleLogout = () => {
    toast.success("You have been logged out");
    navigate("/");
  };

  // Navigation items based on role
  const navItems = role === "student" 
    ? [
        { icon: <Home size={20} />, label: "Dashboard", path: "/student-dashboard" },
        { icon: <Users size={20} />, label: "Rate Teachers", path: "/student-dashboard/rate" },
        { icon: <MessageSquare size={20} />, label: "Suggestions", path: "/student-dashboard/suggestions" },
        { icon: <Settings size={20} />, label: "Settings", path: "/student-dashboard/settings" },
      ]
    : [
        { icon: <Home size={20} />, label: "Dashboard", path: "/faculty-dashboard" },
        { icon: <BarChart size={20} />, label: "Analytics", path: "/faculty-dashboard/analytics" },
        { icon: <MessageSquare size={20} />, label: "Feedback", path: "/faculty-dashboard/feedback" },
        { icon: <Settings size={20} />, label: "Settings", path: "/faculty-dashboard/settings" },
      ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center">
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  expanded ? "transform rotate-180" : ""
                }`}
              />
            </button>
            <h1 className="ml-3 text-xl font-semibold text-gray-900">
              {role === "student" ? "Student Dashboard" : "Faculty Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 transition-all duration-300 ${
            expanded ? "w-60" : "w-20"
          }`}
        >
          <nav className="flex flex-col h-full py-4">
            <div className="px-4 mb-6 flex items-center justify-center">
              {role === "student" ? (
                <GraduationCap
                  className={`h-8 w-8 text-education-blue ${
                    expanded ? "mr-3" : "mx-auto"
                  }`}
                />
              ) : (
                <BookOpen
                  className={`h-8 w-8 text-education-green ${
                    expanded ? "mr-3" : "mx-auto"
                  }`}
                />
              )}
              {expanded && (
                <span className="text-lg font-semibold">
                  {role === "student" ? "Student" : "Faculty"}
                </span>
              )}
            </div>

            <div className="space-y-1 px-2 flex-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={`flex items-center py-2 px-3 rounded-md w-full hover:bg-gray-100 transition-colors ${
                    window.location.pathname === item.path
                      ? "bg-gray-100 text-primary font-medium"
                      : "text-gray-700"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <span className={expanded ? "mr-3" : "mx-auto"}>{item.icon}</span>
                  {expanded && <span>{item.label}</span>}
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
