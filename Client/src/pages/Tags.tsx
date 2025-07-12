
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, TrendingUp, Hash, Filter } from "lucide-react";

const Tags = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Mock data - replace with API calls
  const allTags = [
    {
      name: "javascript",
      description: "For questions about the JavaScript programming language",
      questionCount: 1247,
      todayCount: 23,
      color: "bg-yellow-500",
      trending: true
    },
    {
      name: "react",
      description: "A JavaScript library for building user interfaces",
      questionCount: 987,
      todayCount: 18,
      color: "bg-blue-500",
      trending: true
    },
    {
      name: "typescript",
      description: "A typed superset of JavaScript that compiles to plain JavaScript",
      questionCount: 765,
      todayCount: 15,
      color: "bg-blue-600",
      trending: true
    },
    {
      name: "python",
      description: "A high-level programming language known for its simplicity",
      questionCount: 654,
      todayCount: 12,
      color: "bg-green-500",
      trending: false
    },
    {
      name: "nodejs",
      description: "A JavaScript runtime built on Chrome's V8 JavaScript engine",
      questionCount: 543,
      todayCount: 8,
      color: "bg-green-600",
      trending: false
    },
    {
      name: "css",
      description: "Cascading Style Sheets for styling web pages",
      questionCount: 432,
      todayCount: 7,
      color: "bg-pink-500",
      trending: false
    },
    {
      name: "html",
      description: "HyperText Markup Language for creating web pages",
      questionCount: 398,
      todayCount: 5,
      color: "bg-orange-500",
      trending: false
    },
    {
      name: "vue",
      description: "A progressive JavaScript framework for building user interfaces",
      questionCount: 287,
      todayCount: 4,
      color: "bg-green-400",
      trending: false
    },
    {
      name: "angular",
      description: "A platform for building mobile and desktop web applications",
      questionCount: 256,
      todayCount: 3,
      color: "bg-red-500",
      trending: false
    },
    {
      name: "mongodb",
      description: "A document-oriented NoSQL database",
      questionCount: 234,
      todayCount: 6,
      color: "bg-green-700",
      trending: false
    },
    {
      name: "express",
      description: "Fast, unopinionated, minimalist web framework for Node.js",
      questionCount: 198,
      todayCount: 2,
      color: "bg-gray-600",
      trending: false
    },
    {
      name: "api",
      description: "Application Programming Interface related questions",
      questionCount: 187,
      todayCount: 9,
      color: "bg-purple-500",
      trending: false
    },
    {
      name: "database",
      description: "Questions about database design, queries, and management",
      questionCount: 176,
      todayCount: 4,
      color: "bg-indigo-500",
      trending: false
    },
    {
      name: "git",
      description: "Distributed version control system",
      questionCount: 165,
      todayCount: 3,
      color: "bg-orange-600",
      trending: false
    },
    {
      name: "nextjs",
      description: "A React framework for production applications",
      questionCount: 143,
      todayCount: 8,
      color: "bg-gray-800",
      trending: true
    },
    {
      name: "tailwindcss",
      description: "A utility-first CSS framework",
      questionCount: 132,
      todayCount: 11,
      color: "bg-teal-500",
      trending: true
    }
  ];

  const filteredTags = allTags.filter(tag =>
    tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tag.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTags = [...filteredTags].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.questionCount - a.questionCount;
      case "trending":
        return b.todayCount - a.todayCount;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const trendingTags = allTags.filter(tag => tag.trending).slice(0, 6);
  const totalQuestions = allTags.reduce((sum, tag) => sum + tag.questionCount, 0);

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "trending", label: "Trending Today" },
    { value: "name", label: "Alphabetical" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Tags</h1>
          <p className="text-muted-foreground">
            Explore topics and find questions by technology or concept
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tags..."
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
            <div className="text-2xl font-bold text-primary">{allTags.length}</div>
            <div className="text-sm text-muted-foreground">Total Tags</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{totalQuestions}</div>
            <div className="text-sm text-muted-foreground">Total Questions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">{trendingTags.length}</div>
            <div className="text-sm text-muted-foreground">Trending Today</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {allTags.reduce((sum, tag) => sum + tag.todayCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Questions Today</div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Tags */}
      {trendingTags.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Trending Today
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trendingTags.map((tag) => (
                <Link key={tag.name} to={`/questions?tag=${tag.name}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full ${tag.color} mt-2`} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary" className="tag-chip">
                              {tag.name}
                            </Badge>
                            <Badge className="bg-red-100 text-red-800 text-xs">
                              +{tag.todayCount}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {tag.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {tag.questionCount.toLocaleString()} questions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedTags.map((tag) => (
          <Link key={tag.name} to={`/questions?tag=${tag.name}`}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${tag.color}`} />
                    <Badge variant="secondary" className="tag-chip">
                      <Hash className="w-3 h-3 mr-1" />
                      {tag.name}
                    </Badge>
                  </div>
                  {tag.trending && (
                    <Badge className="bg-red-100 text-red-800">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {tag.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Total questions</span>
                    <span className="font-medium">{tag.questionCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Asked today</span>
                    <span className="font-medium text-green-600">+{tag.todayCount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {sortedTags.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Hash className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium text-lg mb-2">No tags found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or browse all tags.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Tags;
