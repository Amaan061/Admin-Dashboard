import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CreateEntry = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.role) {
      newErrors.role = "Role is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "New entry has been created successfully.",
      });
      navigate("/dashboard");
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create New Entry</h1>
        <p className="text-muted-foreground mt-1">
          Add a new team member to your organization
        </p>
      </div>

      {/* Form Card */}
      <Card className="border-0 shadow-lg bg-gradient-surface">
        <CardHeader className="bg-card-header rounded-t-lg">
          <CardTitle className="text-xl">Member Information</CardTitle>
          <CardDescription>
            Fill in the details for the new team member
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name Field */}
            <div className="space-y-2">
              <div className="input-floating">
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter full name"
                  className={`h-14 ${errors.name ? 'border-destructive' : ''}`}
                />
                <label htmlFor="name">Full Name</label>
              </div>
              {errors.name && (
                <p className="text-sm text-destructive font-medium">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <div className="input-floating">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter email address"
                  className={`h-14 ${errors.email ? 'border-destructive' : ''}`}
                />
                <label htmlFor="email">Email Address</label>
              </div>
              {errors.email && (
                <p className="text-sm text-destructive font-medium">{errors.email}</p>
              )}
            </div>

            {/* Role Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Role <span className="text-destructive">*</span>
              </label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger className={`h-14 ${errors.role ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Designer">Designer</SelectItem>
                  <SelectItem value="Analyst">Analyst</SelectItem>
                  <SelectItem value="Intern">Intern</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-destructive font-medium">{errors.role}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>Creating Entry...</span>
                  </div>
                ) : (
                  "Create Entry"
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="flex-1 h-12"
                onClick={() => navigate("/dashboard")}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="text-primary text-xl">💡</div>
            <div>
              <h3 className="font-semibold text-primary mb-1">Quick Tip</h3>
              <p className="text-sm text-primary/80">
                Make sure the email address is valid as this will be used for sending invitations 
                and important notifications to the new team member.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateEntry;