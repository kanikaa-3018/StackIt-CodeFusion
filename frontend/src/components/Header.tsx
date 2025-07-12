
import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu, Sun, Moon, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onMenuToggle: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogoClick: () => void;
  onSearch: (query: string) => void;
  onNotificationClick: (type: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onMenuToggle, 
  currentPage, 
  onPageChange, 
  onLogoClick, 
  onSearch,
  onNotificationClick 
}) => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications] = useState([
    { id: 1, type: 'upvote', message: 'Your answer got upvoted!', time: '2m ago', unread: true },
    { id: 2, type: 'comment', message: 'New comment on your question', time: '1h ago', unread: true },
    { id: 3, type: 'badge', message: 'You earned a new badge! 🔥', time: '3h ago', unread: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setShowProfileMenu(false);
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Logging out user');
    logout();
    setShowProfileMenu(false);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleNotificationClick = () => {
    console.log('Opening notifications');
    setShowNotifications(!showNotifications);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    console.log('Opening profile menu');
    setShowProfileMenu(!showProfileMenu);
    setShowNotifications(false);
  };

  const handleMarkAllAsRead = () => {
    console.log('Marking all notifications as read');
    toast({
      title: "Notifications updated",
      description: "All notifications marked as read.",
    });
    setShowNotifications(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', searchQuery);
    onSearch(searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Real-time search
    onSearch(query);
  };

  const handleNotificationItemClick = (notification: any) => {
    console.log('Notification item clicked:', notification);
    onNotificationClick(notification.type);
    setShowNotifications(false);
  };

  return (
    <header className="bg-card/95 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={onMenuToggle}
              className="md:hidden"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <button 
              onClick={onLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold gradient-text hidden sm:block">StackIt</h1>
            </button>

            <nav className="hidden md:flex space-x-2">
              <Button
                variant={currentPage === 'home' ? 'default' : 'ghost'}
                onClick={() => onPageChange('home')}
                size="sm"
              >
                Home
              </Button>
              <Button
                variant={currentPage === 'questions' ? 'default' : 'ghost'}
                onClick={() => onPageChange('questions')}
                size="sm"
              >
                Questions
              </Button>
              <Button
                variant={currentPage === 'tags' ? 'default' : 'ghost'}
                onClick={() => onPageChange('tags')}
                size="sm"
              >
                Tags
              </Button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-lg mx-2 sm:mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-foreground placeholder:text-muted-foreground text-sm"
              />
            </form>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {user && (
              <>
                <div className="relative dropdown-container">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNotificationClick}
                    className="relative"
                  >
                    <Bell className="w-5 h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center animate-bounce-soft">
                        {unreadCount}
                      </span>
                    )}
                  </Button>

                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-popover border border-border rounded-xl shadow-lg py-2 animate-fade-in z-50">
                      <div className="px-4 py-2 border-b border-border">
                        <h3 className="font-semibold text-popover-foreground">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <button
                            key={notification.id}
                            onClick={() => handleNotificationItemClick(notification)}
                            className={`w-full px-4 py-3 hover:bg-muted transition-colors cursor-pointer text-left ${
                              notification.unread ? 'bg-primary/5' : ''
                            }`}
                          >
                            <p className="text-sm text-popover-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                          </button>
                        ))}
                      </div>
                      <div className="px-4 py-2 border-t border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleMarkAllAsRead}
                          className="text-primary hover:text-primary/80"
                        >
                          Mark all as read
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative dropdown-container">
                  <Button
                    variant="ghost"
                    onClick={handleProfileClick}
                    className="flex items-center space-x-1 sm:space-x-2 h-auto py-2 px-2 sm:px-3"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-card-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.reputation} rep</p>
                    </div>
                  </Button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-xl shadow-lg py-2 animate-fade-in z-50">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          onPageChange('profile');
                          setShowProfileMenu(false);
                        }}
                        className="w-full justify-start px-4 py-2 text-popover-foreground hover:bg-muted"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full justify-start px-4 py-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  )}
                </div>
              </>
            )}

            {!user && (
              <Button onClick={() => onPageChange('auth')} size="sm">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
