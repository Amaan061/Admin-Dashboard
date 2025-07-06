import { useState } from "react";
import AltibbeLogo from "@/assets/logo/altibbe-logo.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all fields.",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/20 overflow-hidden">
      <div className="w-full max-w-2xl animate-scale-in">
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur-sm">
          <CardHeader className="space-y-6 pb-8">
            <div className="flex flex-col items-center justify-center">
              <img
                src={AltibbeLogo}
                alt="Altibbe Health Logo"
                className="w-20 h-20 mb-2 drop-shadow-md transition-all duration-300 dark:brightness-90"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(34,211,238,0.15))' }}
              />
              <span className="block text-base font-semibold tracking-wide text-primary dark:text-cyan-300 mb-1">Altibbe Health</span>
              <span className="block text-xs text-muted-foreground font-medium tracking-wide text-center mb-2">
                Empowering Your Health Journey
              </span>
            </div>
            <div className="text-center space-y-3">
              <CardTitle className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Sign in to your admin dashboard
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-7">
                <div className="space-y-3">
                  <label htmlFor="email" className="text-lg font-semibold text-foreground">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-14 text-lg transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-3">
                  <label htmlFor="password" className="text-lg font-semibold text-foreground">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-14 text-lg transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    togglePassword
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full h-14 text-lg bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
            <div className="mt-10 text-center">
              <p className="text-lg text-muted-foreground">
                Demo credentials: any email and password
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;