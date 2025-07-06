import { useEffect, useState } from "react";


import { supabase } from "@/lib/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

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
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [joinDateFilter, setJoinDateFilter] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
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

  // Filtering and sorting logic
  let filteredData = data;
  if (roleFilter !== "All") {
    filteredData = filteredData.filter((u) => u.role === roleFilter);
  }
  if (joinDateFilter) {
    filteredData = filteredData.filter((u) => {
      if (!u.join_date) return false;
      // Compare only the date part
      return new Date(u.join_date).toISOString().split('T')[0] === joinDateFilter;
    });
  }
  if (search.trim() !== "") {
    const s = search.toLowerCase();
    filteredData = filteredData.filter((u) =>
      u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
    );
  }
  if (sortBy) {
    filteredData = [...filteredData].sort((a, b) => {
      let aValue = a[sortBy as keyof User];
      let bValue = b[sortBy as keyof User];
      if (sortBy === "join_date") {
        aValue = new Date(aValue as string).getTime();
        bValue = new Date(bValue as string).getTime();
      }
      if (aValue === bValue) return 0;
      if (sortOrder === "asc") return aValue > bValue ? 1 : -1;
      return aValue < bValue ? 1 : -1;
    });
  }

  // Use a static list for all possible roles
  const allRoles = ["Designer", "Manager", "Analyst", "Developer", "Intern"];

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
            <CardContent className="flex flex-col items-center justify-center p-10 min-h-[120px] h-full">
              <span className="text-5xl mb-2 flex items-center justify-center">{stat.icon}</span>
              <span className="text-4xl xl:text-5xl font-bold text-[hsl(var(--foreground))]" style={{color: 'hsl(var(--foreground))'}}>{stat.value}</span>
              <span className="text-lg xl:text-xl text-muted-foreground">{stat.title}</span>
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
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 mb-2 w-full">
            {/* Role Filter */}
            <div className="relative">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full bg-muted/60 rounded-lg px-4 py-3 border-2 border-transparent focus:border-primary focus:ring-0 focus:outline-none transition-all duration-200 font-semibold text-foreground">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black dark:bg-[#18181b] dark:text-white">
                  <SelectItem value="All" className="focus:bg-gray-100 dark:focus:bg-[#232326] focus:text-black dark:focus:text-white">All Roles</SelectItem>
                  {allRoles.map(role => (
                    <SelectItem key={role} value={role} className="focus:bg-gray-100 dark:focus:bg-[#232326] focus:text-black dark:focus:text-white">{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Join Date Filter */}
            <div className="relative">
              <input
                type="date"
                className="appearance-none w-full bg-muted/60 rounded-lg px-4 py-3 border-2 border-transparent focus:border-primary focus:ring-0 focus:outline-none transition-all duration-200 font-semibold text-foreground"
                value={joinDateFilter || ''}
                onChange={e => setJoinDateFilter(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
              />
              {joinDateFilter && (
                <button onClick={() => setJoinDateFilter('')} className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              )}
            </div>

            {/* Search Filter */}
            <div className="relative lg:col-span-1">
              <input
                type="text"
                className="w-full bg-muted/60 rounded-lg pl-12 pr-4 py-3 border-2 border-transparent focus:border-primary focus:ring-0 focus:outline-none transition-all duration-200 font-semibold text-foreground placeholder:text-[#18181b] dark:placeholder:text-white"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#18181b] dark:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-lg xl:text-xl">
              <thead className="bg-muted/30">
                <tr>
                  <th
                    className="text-left p-6 font-semibold text-lg xl:text-xl text-muted-foreground cursor-pointer select-none"
                    onClick={() => {
                      if (sortBy === "name") setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      setSortBy("name");
                    }}
                  >
                    Name {sortBy === "name" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="text-left p-6 font-semibold text-lg xl:text-xl text-muted-foreground cursor-pointer select-none"
                    onClick={() => {
                      if (sortBy === "email") setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      setSortBy("email");
                    }}
                  >
                    Email {sortBy === "email" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    className="text-left p-6 font-semibold text-lg xl:text-xl text-muted-foreground cursor-pointer select-none"
                    onClick={() => {
                      if (sortBy === "role") setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      setSortBy("role");
                    }}
                  >
                    Role {sortBy === "role" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th className="text-left p-6 font-semibold text-lg xl:text-xl text-muted-foreground">Status</th>
                  <th
                    className="text-left p-6 font-semibold text-lg xl:text-xl text-muted-foreground cursor-pointer select-none"
                    onClick={() => {
                      if (sortBy === "join_date") setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      setSortBy("join_date");
                    }}
                  >
                    Join Date {sortBy === "join_date" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th className="text-left p-6 font-semibold text-lg xl:text-xl text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-xl text-muted-foreground">Loading users...</td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-xl text-muted-foreground">No users found.</td>
                  </tr>
                ) : (
                  filteredData.map((row) => (
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
                        {row.join_date ? new Date(row.join_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "-"}
                      </td>
                      <td className="p-6">
                        <div className="flex space-x-3">
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => handleEdit(row.id)}
                            className="hover:bg-primary/10 hover:text-primary text-lg xl:text-xl px-4 py-3"
                          >
                            ✏️ Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => handleDelete(row.id)}
                            className="hover:bg-destructive/10 hover:text-destructive text-lg xl:text-xl px-4 py-3"
                          >
                            🗑️ Delete
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