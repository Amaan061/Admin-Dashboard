import { NavLink, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "📊"
  },
  {
    title: "Create Entry",
    url: "/create-entry",
    icon: "➕"
  }
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 flex flex-col h-screen",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-sm">
                <div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
              </div>
              <h1 className="font-bold text-lg text-foreground">Admin Panel</h1>
            </div>
          )}
          <button
            onClick={onToggle}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-accent transition-colors"
          >
            {isCollapsed ? "→" : "←"}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={({ isActive }) =>
              cn(
                "sidebar-item group",
                isActive && "active"
              )
            }
          >
            <span className="text-lg">{item.icon}</span>
            {!isCollapsed && (
              <span className="ml-3 transition-all duration-200">{item.title}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        <div className={cn(
          "flex items-center space-x-3 p-3 rounded-lg bg-muted/50",
          isCollapsed && "justify-center"
        )}>
          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
            A
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {localStorage.getItem("userEmail") || "Admin User"}
              </p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          )}
        </div>
        
        <button
          onClick={handleLogout}
          className={cn(
            "w-full mt-3 flex items-center px-3 py-2 text-sm font-medium text-destructive rounded-lg hover:bg-destructive/10 transition-colors",
            isCollapsed && "justify-center"
          )}
        >
          <span className="text-lg">🚪</span>
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;