import { NavLink, useNavigate } from "react-router-dom";
  import { LogOut } from "lucide-react";
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
      "fixed left-0 top-0 z-40 bg-card border-r border-border transition-all duration-300 flex flex-col h-screen",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className={cn(
        "border-b border-border flex items-center justify-between",
        isCollapsed ? "px-0 py-2" : "p-4"
      )}>
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
          className={cn(
            "flex items-center justify-center rounded-lg hover:bg-accent transition-colors",
            isCollapsed ? "w-10 h-10 mx-auto" : "w-8 h-8"
          )}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? "→" : "←"}
        </button>
      </div>

      {/* Navigation */}
      <nav className={cn(
        "flex-1",
        isCollapsed ? "py-4 flex flex-col items-center gap-4" : "p-4 space-y-2"
      )}>
        {sidebarItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={({ isActive }) =>
              cn(
                "sidebar-item group flex items-center justify-center",
                isCollapsed ? "w-10 h-10 rounded-lg hover:bg-accent text-xl" : "",
                isActive && "active"
              )
            }
            style={isCollapsed ? { margin: 0 } : {}}
          >
            <span className={cn(isCollapsed ? "mx-auto" : "text-lg")}>{item.icon}</span>
            {!isCollapsed && (
              <span className="ml-3 transition-all duration-200">{item.title}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className={cn(
        isCollapsed ? "flex flex-col items-center gap-2 py-4 border-t border-border" : "p-4 border-t border-border"
      )}>
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center w-10 h-10 bg-gradient-primary rounded-full mb-1" : "space-x-3 p-3 rounded-lg bg-muted/50"
        )}>
          <div className={cn(
            isCollapsed ? "w-7 h-7 flex items-center justify-center text-primary-foreground font-semibold text-base" : "w-8 h-8 flex items-center justify-center text-primary-foreground font-semibold text-sm bg-gradient-primary rounded-full"
          )}>
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
            isCollapsed
              ? "w-10 h-10 flex items-center justify-center rounded-full hover:bg-destructive/10 text-destructive mt-1 transition-colors"
              : "w-full mt-3 flex items-center px-3 py-2 text-base font-medium text-destructive rounded-lg hover:bg-destructive/10 transition-colors gap-3"
          )}
          aria-label="Logout"
        >
          <LogOut className={cn(
            isCollapsed ? "w-6 h-6" : "w-5 h-5",
            "transition-transform duration-150"
          )} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;