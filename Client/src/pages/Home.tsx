
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  MessageCircle, 
  Eye, 
  ArrowUp,
  Star,
  Flame,
  Users,
  Award,
  Sparkles,
  Plus,
  RefreshCw
} from "lucide-react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("newest");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Enhanced mock data
  const mockQuestions = [
    {
      id: 1,
      title: "How to implement authentication in React with TypeScript?",
      description: "I'm building a React app with TypeScript and need to implement user authentication. What's the best approach for handling login/logout states and protecting routes?",
      author: {
        name: "CodeNewbie23",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
        reputation: 145,
        badges: ["New Member"]
      },
      votes: 12,
      answers: 3,
      views: 256,
      tags: ["react", "typescript", "authentication", "security"],
      createdAt: "2 hours ago",
      status: "open",
      hasAcceptedAnswer: true,
      bounty: null
    },
    {
      id: 2,
      title: "Why is my async/await not working in JavaScript?",
      description: "I'm trying to use async/await to handle promises but getting unexpected behavior. The function seems to return undefined instead of the expected data...",
      author: {
        name: "JSLearner",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
        reputation: 89,
        badges: ["Curious Coder"]
      },
      votes: 8,
      answers: 2,
      views: 124,
      tags: ["javascript", "async-await", "promises", "debugging"],
      createdAt: "4 hours ago",
      status: "open",
      hasAcceptedAnswer: false,
      bounty: 50
    },
    {
      id: 3,
      title: "Best practices for organizing React project structure?",
      description: "As my React project grows, I'm struggling with how to organize components, hooks, and utilities. What are the current best practices for scalable React project structure?",
      author: {
        name: "ReactDev2024",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
        reputation: 320,
        badges: ["Active Contributor", "React Enthusiast"]
      },
      votes: 15,
      answers: 7,
      views: 445,
      tags: ["react", "project-structure", "best-practices", "architecture"],
      createdAt: "6 hours ago",
      status: "open",
      hasAcceptedAnswer: false,
      bounty: null
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: When to use which?",
      description: "I understand both CSS Grid and Flexbox individually, but I'm confused about when to use one over the other. Are there specific use cases where one is clearly better?",
      author: {
        name: "CSSMaster",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
        reputation: 892,
        badges: ["CSS Expert", "Design Guru"]
      },
      votes: 22,
      answers: 5,
      views: 678,
      tags: ["css", "grid", "flexbox", "layout", "responsive-design"],
      createdAt: "8 hours ago",
      status: "answered",
      hasAcceptedAnswer: true,
      bounty: null
    },
    {
      id: 5,
      title: "How to optimize React app performance?",
      description: "My React application is getting slower as it grows. What are the most effective techniques for optimizing React performance in 2024?",
      author: {
        name: "PerformanceGuru",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
        reputation: 1250,
        badges: ["Performance Expert", "Senior Developer"]
      },
      votes: 31,
      answers: 12,
      views: 1024,
      tags: ["react", "performance", "optimization", "memo", "usecallback"],
      createdAt: "1 day ago",
      status: "answered",
      hasAcceptedAnswer: true,
      bounty: null
    }
  ];

  const trendingTags = [
    { name: "react", count: 1250, trending: true },
    { name: "javascript", count: 2100, trending: true },
    { name: "typescript", count: 890, trending: false },
    { name: "python", count: 1650, trending: true },
    { name: "css", count: 720, trending: false },
    { name: "nodejs", count: 980, trending: true },
    { name: "api", count: 450, trending: false },
    { name: "database", count: 380, trending: false }
  ];

  const communityStats = {
    totalQuestions: 15420,
    totalAnswers: 28950,
    totalUsers: 3250,
    questionsToday: 47
  };

  const filters = [
    { id: "newest", label: "Newest", icon: Clock },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "unanswered", label: "Unanswered", icon: MessageCircle },
    { id: "bounty", label: "Bounty", icon: Award }
  ];

  const handleTagFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const getQuestionStatusColor = (question: any) => {
    if (question.hasAcceptedAnswer) return "text-green-600";
    if (question.answers === 0) return "text-yellow-600";
    return "text-blue-600";
  };

  const getQuestionStatusIcon = (question: any) => {
    if (question.hasAcceptedAnswer) return "✅";
    if (question.answers === 0) return "❓";
    return "💬";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-8 border border-primary/10">
        <div className="absolute top-4 right-4 opacity-10">
          <Sparkles className="w-32 h-32" />
        </div>
        <div className="relative">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                Welcome to StackIt
              </h1>
              <p className="text-lg text-muted-foreground">
                Ask questions, share knowledge, and learn together with our developer community
              </p>
            </div>
            <Link to="/ask">
              <Button size="lg" className="gradient-bg text-white hover:opacity-90 rounded-full px-8 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="w-5 h-5 mr-2" />
                Ask Question
              </Button>
            </Link>
          </div>
          
          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-background/50 rounded-xl border border-border/50">
              <div className="text-2xl font-bold text-primary">{communityStats.totalQuestions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Questions</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-xl border border-border/50">
              <div className="text-2xl font-bold text-green-600">{communityStats.totalAnswers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Answers</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-xl border border-border/50">
              <div className="text-2xl font-bold text-accent">{communityStats.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-xl border border-border/50">
              <div className="text-2xl font-bold text-orange-600">{communityStats.questionsToday}</div>
              <div className="text-sm text-muted-foreground">Today</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 border-2 focus:border-primary/50"
                />
              </div>
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Filter Questions
              </h3>
              <div className="space-y-2">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "ghost"}
                    className="w-full justify-start rounded-xl"
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    <filter.icon className="w-4 h-4 mr-2" />
                    {filter.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trending Tags */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Trending Tags
              </h3>
              <div className="space-y-3">
                {trendingTags.map((tag) => (
                  <div
                    key={tag.name}
                    className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                    onClick={() => handleTagFilter(tag.name)}
                  >
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={selectedTags.includes(tag.name) ? "default" : "secondary"} 
                        className="tag-chip group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        {tag.name}
                      </Badge>
                      {tag.trending && (
                        <Flame className="w-3 h-3 text-orange-500" />
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      {tag.count}
                    </span>
                  </div>
                ))}
              </div>
              <Link to="/tags">
                <Button variant="outline" className="w-full mt-4 rounded-xl">
                  View All Tags
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Questions Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Questions</h2>
              <p className="text-muted-foreground">
                {activeFilter === "newest" && "Latest questions from the community"}
                {activeFilter === "trending" && "Popular questions trending now"}
                {activeFilter === "unanswered" && "Questions waiting for answers"}
                {activeFilter === "bounty" && "Questions with bounty rewards"}
              </p>
            </div>
            <Button variant="outline" size="sm" className="rounded-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-xl border border-border">
              <span className="text-sm font-medium text-muted-foreground">Filtered by:</span>
              {selectedTags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="default" 
                  className="tag-chip cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  onClick={() => handleTagFilter(tag)}
                >
                  {tag} ×
                </Badge>
              ))}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedTags([])}
                className="h-6 px-2 text-xs rounded-full"
              >
                Clear all
              </Button>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-4">
            {mockQuestions.map((question) => (
              <Card key={question.id} className="question-card group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Stats Column */}
                    <div className="flex flex-col items-center gap-4 min-w-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-lg font-bold">
                          <ArrowUp className="w-4 h-4 text-green-600" />
                          <span>{question.votes}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">votes</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className={`flex items-center gap-1 text-lg font-bold ${getQuestionStatusColor(question)}`}>
                          <span>{getQuestionStatusIcon(question)}</span>
                          <span>{question.answers}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">answers</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                          <Eye className="w-3 h-3" />
                          <span>{question.views}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">views</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <Link to={`/questions/${question.id}`}>
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors leading-tight mb-2 line-clamp-2">
                              {question.title}
                            </h3>
                          </Link>
                          <p className="text-muted-foreground line-clamp-2 leading-relaxed">
                            {question.description}
                          </p>
                        </div>
                        {question.bounty && (
                          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 ml-4 shrink-0">
                            <Award className="w-3 h-3 mr-1" />
                            +{question.bounty}
                          </Badge>
                        )}
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map((tag) => (
                          <Link key={tag} to={`/tags/${tag}`}>
                            <Badge 
                              variant="secondary" 
                              className="tag-chip hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                            >
                              {tag}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                      
                      {/* Meta Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {question.createdAt}
                          </span>
                          <Badge variant={question.status === 'answered' ? 'default' : 'secondary'} className="text-xs">
                            {question.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Avatar className="w-8 h-8 border border-border">
                            <AvatarImage src={question.author.avatar} />
                            <AvatarFallback className="text-xs">{question.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="text-right">
                            <Link to={`/users/${question.author.name}`} className="text-sm font-medium hover:text-primary transition-colors">
                              {question.author.name}
                            </Link>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Star className="w-3 h-3" />
                              <span>{question.author.reputation}</span>
                              {question.author.badges.slice(0, 1).map((badge) => (
                                <Badge key={badge} variant="outline" className="text-xs px-1 py-0 ml-1">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center pt-8">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              Load More Questions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
