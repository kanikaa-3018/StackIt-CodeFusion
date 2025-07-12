
import React from 'react';
import { Home, Plus, Bell, User, Hash } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MobileNavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ currentPage, onPageChange }) => {
  const { user } = useAuth();
  
  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'ask', icon: Plus, label: 'Ask' },
    { id: 'tags', icon: Hash, label: 'Tags' },
    { id: 'notifications', icon: Bell, label: 'Alerts' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  if (!user) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
              currentPage === item.id
                ? 'text-primary bg-primary/10'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <item.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
