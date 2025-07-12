
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, Users as UsersIcon, Trophy, Star, MapPin, Calendar } from "lucide-react";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("reputation");

  // Mock data - replace with API calls
  const allUsers = [
    {
      id: 1,
      username: "ReactMaster",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=reactmaster",
      reputation: 4850,
      questionsAsked: 23,
      answersGiven: 187,
      badgesEarned: 15,
      location: "San Francisco, CA",
      joinDate: "Jan 2023",
      bio: "Senior React developer with 8+ years of experience. Love helping the community!",
      topTags: ["react", "javascript", "typescript"],
      isOnline: true,
      lastSeen: "Active now"
    },
    {
      id: 2,
      username: "PythonGuru",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=pythonguru",
      reputation: 3240,
      questionsAsked: 45,
      answersGiven: 156,
      badgesEarned: 12,
      location: "London, UK",
      joinDate: "Mar 2023",
      bio: "Full-stack Python developer passionate about data science and web development.",
      topTags: ["python", "django", "flask"],
      isOnline: false,
      lastSeen: "2 hours ago"
    },
    {
      id: 3,
      username: "DevExpert",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=devexpert",
      reputation: 2890,
      questionsAsked: 67,
      answersGiven: 134,
      badgesEarned: 18,
      location: "Toronto, CA",
      joinDate: "Feb 2023",
      bio: "Polyglot programmer with expertise in multiple technologies. Always learning!",
      topTags: ["javascript", "nodejs", "mongodb"],
      isOnline: true,
      lastSeen: "Active now"
    },
    {
      id: 4,
      username: "CSSNinja",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cssninja",
      reputation: 2156,
      questionsAsked: 12,
      answersGiven: 98,
      badgesEarned: 8,
      location: "Berlin, DE",
      joinDate: "Apr 2023",
      bio: "Frontend specialist focusing on CSS, animations, and user experience design.",
      topTags: ["css", "html", "sass"],
      isOnline: false,
      lastSeen: "1 day ago"
    },
    {
      id: 5,
      username: "BackendBoss",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=backendboss",
      reputation: 1987,
      questionsAsked: 34,
      answersGiven: 89,
      badgesEarned: 11,
      location: "Sydney, AU",
      joinDate: "May 2023",
      bio: "Backend engineer with focus on scalable systems and API design.",
      topTags: ["nodejs", "express", "postgresql"],
      isOnline: true,
      lastSeen: "Active now"
    },
    {
      id: 6,
      username: "MobileWiz",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mobilewiz",
      reputation: 1743,
      questionsAsked: 56,
      answersGiven: 67,
      badgesEarned: 9,
      location: "Tokyo, JP",
      joinDate: "Jun 2023",
      bio: "Mobile app developer working with React Native and Flutter.",
      topTags: ["react-native", "flutter", "mobile"],
      isOnline: false,
      lastSeen: "3 hours ago"
    },
    {
      id: 7,
      username: "DataScientist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=datascientist",
      reputation: 1432,
      questionsAsked: 78,
      answersGiven: 45,
      badgesEarned: 7,
      location: "New York, NY",
      joinDate: "Jul 2023",
      bio: "Data scientist with expertise in machine learning and analytics.",
      topTags: ["python", "pandas", "tensorflow"],
      isOnline: false,
      lastSeen: "5 hours ago"
    },
    {
      id: 8,
      username: "WebDesigner",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=webdesigner",
      reputation: 1298,
      questionsAsked: 29,
      answersGiven: 72,
      badgesEarned: 6,
      location: "Paris, FR",
      joinDate: "Aug 2023",
      bio: "UI/UX designer who loves to code. Bridging design and development.",
      topTags: ["css", "design", "figma"],
      isOnline: true,
      lastSeen: "Active now"
    }
  ];

  const filteredUsers = allUsers.filter(user =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.topTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    switch (sortBy) {
      case "reputation":
        return b.reputation - a.reputation;
      case "answers":
        return b.answersGiven - a.answersGiven;
      case "questions":
        return b.questionsAsked - a.questionsAsked;
      case "newest":
        return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
      default:
        return 0;
    }
  });

  const onlineUsers = allUsers.filter(user => user.isOnline);
  const totalReputation = allUsers.reduce((sum, user) => sum + user.reputation, 0);

  const sortOptions = [
    { value: "reputation", label: "Reputation" },
    { value: "answers", label: "Most Answers" },
    { value: "questions", label: "Most Questions" },
    { value: "newest", label: "Newest Members" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community Members</h1>
          <p className="text-muted-foreground">
            Connect with developers from around the world
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <div className="flex rounded-full border border-border p-1">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={sortBy === option.value ? "default" : "ghost"}
                size="sm"
                className="rounded-full text-sm"
                onClick={() => setSortBy(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{allUsers.length}</div>
            <div className="text-sm text-muted-foreground">Total Members</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{onlineUsers.length}</div>
            <div className="text-sm text-muted-foreground">Online Now</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{totalReputation.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Reputation</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {allUsers.reduce((sum, user) => sum + user.answersGiven, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Answers</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Contributors */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            Top Contributors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allUsers.slice(0, 3).map((user, index) => (
              <div key={user.id} className="text-center">
                <div className="relative inline-block mb-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="text-lg gradient-bg text-white">
                      {user.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-medium">{user.username}</h3>
                <p className="text-sm text-muted-foreground">{user.reputation.toLocaleString()} reputation</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sortedUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="gradient-bg text-white">
                      {user.username[0]}
                    </AvatarFallback>
                  </Avatar>
                  {user.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <Link to={`/users/${user.username.toLowerCase()}`}>
                      <h3 className="font-semibold hover:text-primary cursor-pointer">
                        {user.username}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-1 text-primary">
                      <Star className="w-4 h-4" />
                      <span className="font-medium">{user.reputation.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {user.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {user.topTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                    <div className="text-center">
                      <div className="font-medium text-foreground">{user.questionsAsked}</div>
                      <div className="text-xs">Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{user.answersGiven}</div>
                      <div className="text-xs">Answers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-foreground">{user.badgesEarned}</div>
                      <div className="text-xs">Badges</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{user.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Joined {user.joinDate}</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs">
                    <span className={user.isOnline ? "text-green-600" : "text-muted-foreground"}>
                      {user.lastSeen}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <UsersIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-2">No users found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all members.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Users;
