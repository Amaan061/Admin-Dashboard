// Modern Admin Dashboard - Premium SaaS Design

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to appropriate page based on authentication
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/20">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow mx-auto animate-scale-in">
          <div className="w-8 h-8 bg-primary-foreground rounded-lg"></div>
        </div>
        <div className="animate-fade-in">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Loading...
          </h1>
          <p className="text-muted-foreground">Redirecting to your dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
