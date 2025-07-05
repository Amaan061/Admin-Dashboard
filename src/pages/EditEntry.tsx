import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const EditEntry = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      const { data, error } = await supabase.from("users").select("name, email, role, status").eq("id", id).single();
      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching user",
          description: error.message,
        });
      } else if (data) {
        setFormData(data);
      }
    };
    fetchUser();
  }, [id, toast]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.role) newErrors.role = "Role is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    const { error } = await supabase.from("users").update({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      status: formData.status,
    }).eq("id", id);
    setIsLoading(false);
    if (error) {
      toast({
        variant: "destructive",
        title: "Error updating entry",
        description: error.message,
      });
    } else {
      toast({
        title: "Success!",
        description: "User entry has been updated successfully.",
      });
      navigate("/dashboard");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="w-full max-w-3xl xl:max-w-4xl mx-auto px-4 xl:px-8 space-y-12 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-foreground">Edit Entry</h1>
        <p className="text-lg text-muted-foreground mt-2">Update the team member's information</p>
      </div>
      <Card className="border-0 shadow-2xl bg-gradient-surface">
        <CardHeader className="bg-card-header rounded-t-lg p-8 xl:p-10">
          <CardTitle className="text-2xl xl:text-3xl">Member Information</CardTitle>
          <CardDescription className="text-lg xl:text-xl">Edit the details for the team member</CardDescription>
        </CardHeader>
        <CardContent className="p-10 xl:p-14">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-3">
              <label htmlFor="name" className="text-lg font-semibold text-foreground">
                Full Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter the team member's full name"
                className={`h-14 text-lg transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.name ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : ''}`}
              />
              {errors.name && (
                <p className="text-lg text-destructive font-medium flex items-center gap-2 mt-1">
                  <span className="w-5 h-5 text-destructive">⚠</span>
                  {errors.name}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <label htmlFor="email" className="text-lg font-semibold text-foreground">
                Email Address <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter the team member's email address"
                className={`h-14 text-lg transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.email ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : ''}`}
              />
              {errors.email && (
                <p className="text-sm text-destructive font-medium flex items-center gap-1 mt-1">
                  <span className="w-4 h-4 text-destructive">⚠</span>
                  {errors.email}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-lg font-semibold text-foreground">
                Role <span className="text-destructive">*</span>
              </label>
              <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)}>
                <SelectTrigger className={`h-14 text-lg transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.role ? 'border-destructive focus:ring-destructive/20 focus:border-destructive' : ''}`}>
                  <SelectValue placeholder="Select the team member's role" className="text-lg" />
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
                <p className="text-sm text-destructive font-medium flex items-center gap-1 mt-1">
                  <span className="w-4 h-4 text-destructive">⚠</span>
                  {errors.role}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="status" className="text-lg font-semibold text-foreground">
                Status
              </label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger className="h-14 text-lg transition-all duration-200 focus:ring-2 focus:ring-primary/20 focus:border-primary">
                  <SelectValue placeholder="Select status" className="text-lg" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                className="flex-1 h-12 bg-gradient-primary hover:shadow-glow transition-all duration-300 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    <span>Updating Entry...</span>
                  </div>
                ) : (
                  "Update Entry"
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
    </div>
  );
};

export default EditEntry;
