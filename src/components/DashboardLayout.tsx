import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen w-full bg-background flex">
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <main
        className={cn(
          "min-h-screen flex-1 overflow-auto transition-all duration-300",
          isCollapsed ? "ml-20" : "ml-56 xl:ml-72"
        )}
      >
        <div className="px-4 sm:px-8 py-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      <Toaster />
    </div>
  );
};

export default DashboardLayout;