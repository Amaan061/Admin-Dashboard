import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import AltibbeLogo from "@/assets/logo/altibbe-logo.svg";

const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <span className="text-2xl">📊</span>
  },
  {
    title: "Create Entry",
    url: "/create-entry",
    icon: <span className="text-2xl">➕</span>
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <span className="text-2xl">⚙️</span>
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
      "fixed left-0 top-0 z-40 bg-card border-r border-border transition-all duration-300 flex flex-col h-screen shadow-xl",
      isCollapsed ? "w-20" : "w-56 xl:w-72"
    )}>
      {/* Header with Altibbe Logo */}
      <div className={cn(
        "border-b border-border flex items-center justify-between",
        isCollapsed ? "px-0 py-3" : "p-6 xl:p-8"
      )}>
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center">
              <img
                src={AltibbeLogo}
                alt="Altibbe Health Logo"
                className="w-10 h-10 drop-shadow-md transition-all duration-300 dark:brightness-90"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(34,211,238,0.15))' }}
              />
            </div>
            <h1 className="font-bold text-lg text-foreground tracking-wide">Altibbe Health</h1>
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
        "flex-1 overflow-y-auto custom-scrollbar",
        isCollapsed ? "py-6 flex flex-col items-center gap-6" : "p-6 xl:p-8 space-y-3"
      )}>
        {sidebarItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={({ isActive }) =>
              cn(
                "sidebar-item group flex items-center justify-center",
                isCollapsed ? "w-12 h-12 rounded-lg hover:bg-accent text-2xl" : "py-3 px-3 gap-4 text-xl",
                isActive && "active"
              )
            }
            style={isCollapsed ? { margin: 0 } : {}}
          >
            {/* Move the Settings icon further left by adding a negative margin if not collapsed */}
            {item.title === "Settings" && !isCollapsed ? (
              <span className="text-2xl flex-shrink-0 -ml-6 mr-2">{item.icon}</span>
            ) : (
              <span className={cn(isCollapsed ? "mx-auto" : "text-2xl flex-shrink-0")}>{item.icon}</span>
            )}
            {!isCollapsed && (
              <span className="ml-4 font-semibold tracking-wide text-lg xl:text-xl transition-all duration-200">
                {item.title}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className={cn(
        isCollapsed ? "flex flex-col items-center gap-3 py-6 border-t border-border" : "p-6 xl:p-8 border-t border-border"
      )}>
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center w-12 h-12 bg-gradient-primary rounded-full mb-2" : "space-x-4 p-4 rounded-xl bg-muted/60"
        )}>
          <div className={cn(
            isCollapsed ? "w-8 h-8 flex items-center justify-center text-primary-foreground font-semibold text-lg" : "w-10 h-10 flex items-center justify-center text-primary-foreground font-semibold text-lg bg-gradient-primary rounded-full"
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