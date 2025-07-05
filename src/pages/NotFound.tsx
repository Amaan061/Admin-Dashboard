import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/20 p-4">
      <div className="text-center space-y-6 animate-fade-in">
        <div className="w-24 h-24 bg-gradient-primary rounded-3xl flex items-center justify-center shadow-glow mx-auto">
          <span className="text-4xl text-primary-foreground">404</span>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">Page Not Found</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="min-w-32"
          >
            Go Back
          </Button>
          <Button 
            onClick={() => window.location.href = "/"}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 min-w-32"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
