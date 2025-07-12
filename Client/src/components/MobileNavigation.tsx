
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Home, Plus, Bell, User, Tag } from "lucide-react";

const MobileNavigation = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/home", id: "mobile-nav-home" },
    { icon: Tag, label: "Tags", path: "/tags", id: "mobile-nav-tags" },
    { icon: Plus, label: "Ask", path: "/ask", isSpecial: true, id: "mobile-nav-ask" },
    { icon: Bell, label: "Notifications", path: "/notifications", badge: 3, id: "mobile-nav-notifications" },
    { icon: User, label: "Profile", path: "/profile", id: "mobile-nav-profile" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around py-2 px-1 max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 relative min-w-0 flex-1 min-h-[44px] min-w-[44px] ${
              location.pathname === item.path
                ? "text-primary scale-105"
                : "text-muted-foreground hover:text-foreground active:scale-95"
            } ${
              item.isSpecial
                ? "gradient-bg text-white p-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110"
                : ""
            }`}
          >
            <item.icon className={`w-5 h-5 ${item.isSpecial ? "w-6 h-6" : ""} shrink-0`} />
            {!item.isSpecial && (
              <span className="text-xs font-medium truncate w-full text-center">
                {item.label}
              </span>
            )}
            {item.badge && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive animate-pulse">
                {item.badge}
              </Badge>
            )}
            {item.isSpecial && (
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-md -z-10" />
            )}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;
