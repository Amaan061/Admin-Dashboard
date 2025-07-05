import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock data for the dashboard
const mockData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Manager",
    status: "Active",
    joinDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com", 
    role: "Developer",
    status: "Active",
    joinDate: "2024-02-20"
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    role: "Designer",
    status: "Inactive",
    joinDate: "2024-01-08"
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Analyst",
    status: "Active",
    joinDate: "2024-03-10"
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "robert.b@example.com",
    role: "Manager",
    status: "Active",
    joinDate: "2023-12-05"
  }
];

const Dashboard = () => {
  const [data, setData] = useState(mockData);
  const { toast } = useToast();

  const handleEdit = (id: number) => {
    toast({
      title: "Edit Feature",
      description: `Edit functionality for user ID ${id} would open here.`,
    });
  };

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
    toast({
      title: "Entry Deleted",
      description: "The entry has been successfully removed.",
    });
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
    { title: "This Month", value: data.filter(u => u.joinDate.startsWith("2024-03")).length, icon: "📅" }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your team.
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("en-US", { 
            weekday: "long", 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover border-0 shadow-md bg-gradient-surface">
            <CardContent className="flex items-center p-6">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Table */}
      <Card className="border-0 shadow-md">
        <CardHeader className="bg-card-header rounded-t-lg">
          <CardTitle className="text-xl">Team Members</CardTitle>
          <CardDescription>
            Manage your team members and their information
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Name</th>
                  <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Email</th>
                  <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Role</th>
                  <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Join Date</th>
                  <th className="text-left p-4 font-semibold text-sm text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr key={row.id} className="table-row-hover border-b border-border/50">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
                          {row.name.charAt(0)}
                        </div>
                        <span className="font-medium text-foreground">{row.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{row.email}</td>
                    <td className="p-4">
                      <Badge variant="outline">{row.role}</Badge>
                    </td>
                    <td className="p-4">{getStatusBadge(row.status)}</td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(row.joinDate).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(row.id)}
                          className="hover:bg-primary/10 hover:text-primary"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(row.id)}
                          className="hover:bg-destructive/10 hover:text-destructive"
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;