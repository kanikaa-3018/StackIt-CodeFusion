
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Search, Bell, Plus, Menu, Moon, Sun, Code, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Search query:", searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-3 sm:px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 min-h-[44px] min-w-[44px]"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <Link to="/home" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <div className="hidden xs:block">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                StackIt
              </h1>
            </div>
          </Link>
        </div>

        {/* Center Section - Search (Desktop) */}
        {!isMobile && (
          <div className="flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search questions, tags, or users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-full bg-muted/50 focus:bg-background transition-colors"
              />
            </form>
          </div>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Mobile Search Toggle */}
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 min-h-[44px] min-w-[44px]"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              aria-label={showMobileSearch ? "Close search" : "Open search"}
            >
              {showMobileSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>
          )}

          {/* Ask Question Button */}
          <Link to="/ask" className="hidden sm:block">
            <Button 
              size={isMobile ? "sm" : "default"}
              className={`rounded-full gradient-bg text-white hover:opacity-90 shadow-md hover:shadow-lg transition-all min-h-[44px] ${
                location.pathname === '/ask' ? 'ring-2 ring-ring' : ''
              }`}
            >
              <Plus className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Ask</span>
            </Button>
          </Link>

          {/* Notifications */}
          <Link to="/notifications">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative rounded-full h-9 w-9 min-h-[44px] min-w-[44px]"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs bg-destructive animate-pulse">
                3
              </Badge>
            </Button>
          </Link>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full h-9 w-9 min-h-[44px] min-w-[44px]"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          {/* User Avatar */}
          <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity min-h-[44px]">
            <Avatar className="w-8 h-8 ring-2 ring-background shadow-md">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="gradient-bg text-white text-sm font-semibold">
                {user?.username?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium leading-none">{user?.username}</p>
              <p className="text-xs text-muted-foreground mt-1">{user?.reputation} rep</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      {isMobile && showMobileSearch && (
        <div className="px-3 pb-3 border-t bg-background/95 backdrop-blur-sm">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search questions, tags, or users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full bg-muted/50 focus:bg-background transition-colors"
              autoFocus
            />
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
