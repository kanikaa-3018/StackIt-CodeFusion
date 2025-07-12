
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Home, MessageSquare, TrendingUp, Tag, Trophy, Users, X, Bell } from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, isMobile = false }) => {
  const location = useLocation();

  const navigationItems = [
    { icon: Home, label: "Home", path: "/home", count: null, id: "nav-home" },
    { icon: MessageSquare, label: "Questions", path: "/questions", count: 1247, id: "nav-questions" },
    { icon: Tag, label: "Tags", path: "/tags", count: 23, id: "nav-tags" },
    { icon: Users, label: "Users", path: "/users", count: null, id: "nav-users" },
    { icon: Bell, label: "Notifications", path: "/notifications", count: 3, id: "nav-notifications" },
    { icon: Trophy, label: "Profile", path: "/profile", count: null, id: "nav-profile" }
  ];

  const trendingTags = [
    { name: "javascript", count: 145, color: "bg-yellow-500", id: "tag-javascript" },
    { name: "react", count: 98, color: "bg-blue-500", id: "tag-react" },
    { name: "python", count: 87, color: "bg-green-500", id: "tag-python" },
    { name: "nodejs", count: 76, color: "bg-green-600", id: "tag-nodejs" },
    { name: "typescript", count: 65, color: "bg-blue-600", id: "tag-typescript" },
    { name: "css", count: 54, color: "bg-pink-500", id: "tag-css" }
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full p-4 space-y-6">
      {isMobile && (
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Navigation */}
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <Link key={item.id} to={item.path}>
            <Button
              variant={location.pathname === item.path ? "default" : "ghost"}
              className="w-full justify-start rounded-xl"
              onClick={isMobile ? onClose : undefined}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
              {item.count && (
                <Badge variant="secondary" className="ml-auto">
                  {item.count}
                </Badge>
              )}
            </Button>
          </Link>
        ))}
      </nav>

      {/* Trending Tags */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Trending Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {trendingTags.map((tag) => (
            <Link key={tag.id} to={`/tags`}>
              <div className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-lg cursor-pointer transition-colors">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${tag.color}`} />
                  <span className="text-sm font-medium">#{tag.name}</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {tag.count}
                </Badge>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Your Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Questions Asked</span>
            <span className="font-medium">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Answers Given</span>
            <span className="font-medium">8</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Reputation</span>
            <span className="font-medium text-primary">150</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-80 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="w-80 border-r border-border bg-card/50 backdrop-blur-sm">
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
