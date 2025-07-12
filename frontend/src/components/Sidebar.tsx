
import React from 'react';
import { Hash, TrendingUp, Clock, Award, Filter, Users, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  onTagClick: (tag: string) => void;
  activeTag: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  activeFilter, 
  onFilterChange, 
  onTagClick,
  activeTag 
}) => {
  const trendingTags = [
    { name: 'React', count: 1234, color: 'bg-blue-500' },
    { name: 'JavaScript', count: 2156, color: 'bg-yellow-500' },
    { name: 'TypeScript', count: 876, color: 'bg-blue-600' },
    { name: 'Node.js', count: 654, color: 'bg-green-500' },
    { name: 'Python', count: 543, color: 'bg-blue-400' },
    { name: 'CSS', count: 432, color: 'bg-purple-500' },
    { name: 'HTML', count: 321, color: 'bg-orange-500' },
    { name: 'Vue.js', count: 298, color: 'bg-green-400' }
  ];

  const filters = [
    { id: 'newest', name: 'Newest', icon: Clock, active: activeFilter === 'newest' },
    { id: 'oldest', name: 'Oldest', icon: Clock, active: activeFilter === 'oldest' },
    { id: 'unanswered', name: 'Unanswered', icon: MessageSquare, active: activeFilter === 'unanswered' },
    { id: 'most-voted', name: 'Most Voted', icon: TrendingUp, active: activeFilter === 'most-voted' },
    { id: 'bounty', name: 'Bounty', icon: Award, active: activeFilter === 'bounty' }
  ];

  const handleFilterClick = (filterId: string) => {
    console.log(`Filter clicked: ${filterId}`);
    onFilterChange(filterId);
    onClose();
  };

  const handleTagClick = (tagName: string) => {
    console.log(`Tag clicked from sidebar: ${tagName}`);
    onTagClick(tagName);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out z-50 md:translate-x-0 md:static md:h-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 sm:p-6 overflow-y-auto h-full">
          {/* Quick Filters */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Quick Filters
              </h3>
            </div>
            <div className="space-y-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={filter.active ? "default" : "ghost"}
                  onClick={() => handleFilterClick(filter.id)}
                  className="w-full justify-start text-left"
                  size="sm"
                >
                  <filter.icon className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">{filter.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Trending Tags
              </h3>
            </div>
            <div className="space-y-2">
              {trendingTags.map((tag) => (
                <Button
                  key={tag.name}
                  variant={activeTag === tag.name ? "default" : "ghost"}
                  onClick={() => handleTagClick(tag.name)}
                  className="w-full justify-between p-3 h-auto"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${tag.color}`} />
                    <span className="text-sm font-medium">{tag.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    {tag.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Users className="w-4 h-4 text-muted-foreground" />
              <h4 className="font-semibold">Community Stats</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Questions</span>
                <span className="font-medium">12,456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Answers</span>
                <span className="font-medium">24,789</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Users</span>
                <span className="font-medium">3,421</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Online</span>
                <span className="font-medium text-green-600">234</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
