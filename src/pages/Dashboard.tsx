import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  join_date: string;
};

const Dashboard = () => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("id, name, email, role, status, join_date");
      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching users",
          description: error.message,
        });
      } else {
        setData(data || []);
      }
      setLoading(false);
    };
    fetchUsers();
  }, [toast]);

  const handleEdit = (id: number) => {
    window.location.href = `/edit-entry/${id}`;
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("users").delete().eq("id", id);
    if (error) {
      toast({
        variant: "destructive",
        title: "Error deleting entry",
        description: error.message,
      });
    } else {
      setData(data.filter(item => item.id !== id));
      toast({
        title: "Entry Deleted",
        description: "The entry has been successfully removed.",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-success/10 text-success hover:bg-success/20">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  const stats = [
    { title: "Total Users", value: data.length, icon: "👥" },
    { title: "Active Users", value: data.filter(u => u.status === "Active").length, icon: "✅" },
    { title: "Managers", value: data.filter(u => u.role === "Manager").length, icon: "👔" },
    { title: "Joined This Month", value: data.filter(u => {
      const now = new Date();
      const join = new Date(u.join_date);
      return join.getMonth() === now.getMonth() && join.getFullYear() === now.getFullYear();
    }).length, icon: "📅" }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 xl:px-8 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Dashboard</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Welcome back! Here's what's happening with your team.
          </p>
        </div>
        <div className="text-base md:text-lg text-muted-foreground">
          {new Date().toLocaleDateString("en-US", { 
            weekday: "long", 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover border-0 shadow-lg bg-gradient-surface">
            <CardContent className="flex items-center p-10 min-h-[120px]">
              <div className="flex items-center space-x-8">
                <div className="text-4xl xl:text-5xl">{stat.icon}</div>
                <div>
                  <p className="text-4xl xl:text-5xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-lg xl:text-xl text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-card-header rounded-t-lg p-8 xl:p-10">
          <CardTitle className="text-2xl xl:text-3xl">Team Members</CardTitle>
          <CardDescription className="text-lg xl:text-xl">
            Manage your team members and their information
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-lg xl:text-xl">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left p-6 font-semibold text-lg xl:text-xl text-muted-foreground">Name</th>
                  <th className="text-left p-6 font-semibold text-lg xl:text-xl text-muted-foreground">Email</th>
                  <th className="text-left p-6 font-semibold text-lg xl:text-xl text-muted-foreground">Role</th>
                  <th className="text-left p-6 font-semibold text-lg xl:text-xl text-muted-foreground">Status</th>
                  <th className="text-left p-6 font-semibold text-lg xl:text-xl text-muted-foreground">Join Date</th>
                  <th className="text-left p-6 font-semibold text-lg xl:text-xl text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-xl text-muted-foreground">Loading users...</td>
                  </tr>
                ) : data.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-xl text-muted-foreground">No users found.</td>
                  </tr>
                ) : (
                  data.map((row) => (
                    <tr key={row.id} className="table-row-hover border-b border-border/50">
                      <td className="p-6">
                        <div className="flex items-center space-x-5">
                          <div className="w-12 h-12 xl:w-14 xl:h-14 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-2xl xl:text-3xl">
                            {row.name.charAt(0)}
                          </div>
                          <span className="font-medium text-foreground text-xl xl:text-2xl">{row.name}</span>
                        </div>
                      </td>
                      <td className="p-6 text-muted-foreground">{row.email}</td>
                      <td className="p-6">
                        <Badge variant="outline" className="text-lg xl:text-xl px-4 py-2">{row.role}</Badge>
                      </td>
                      <td className="p-6">{getStatusBadge(row.status)}</td>
                      <td className="p-6 text-muted-foreground">
                        {row.join_date ? new Date(row.join_date).toLocaleDateString() : "-"}
                      </td>
                      <td className="p-6">
                        <div className="flex space-x-4">
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => handleEdit(row.id)}
                            className="hover:bg-primary/10 hover:text-primary text-lg xl:text-xl px-6 py-3"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => handleDelete(row.id)}
                            className="hover:bg-destructive/10 hover:text-destructive text-lg xl:text-xl px-6 py-3"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;