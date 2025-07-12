
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Trophy, 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Calendar,
  MapPin,
  Link as LinkIcon,
  Github,
  Twitter,
  Edit,
  Settings,
  Award,
  TrendingUp,
  Activity
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data - replace with API calls
  const profileData = {
    ...user,
    bio: "Full-stack developer passionate about React, TypeScript, and building great user experiences. Always learning and sharing knowledge with the community.",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    github: "johndoe",
    twitter: "johndoe_dev",
    joinDate: "March 2023",
    stats: {
      questionsAsked: 23,
      answersGiven: 67,
      reputation: 1580,
      badgesEarned: 8,
      helpfulVotes: 245,
      bestAnswers: 12
    },
    badges: [
      { name: "First Question", description: "Asked your first question", earned: "Mar 2023", color: "bg-blue-500" },
      { name: "Helpful", description: "Received 10 helpful votes", earned: "Apr 2023", color: "bg-green-500" },
      { name: "Good Answer", description: "Answer score of 5 or more", earned: "May 2023", color: "bg-yellow-500" },
      { name: "Popular Question", description: "Question with 100+ views", earned: "Jun 2023", color: "bg-purple-500" },
      { name: "Commentator", description: "Left 50 comments", earned: "Jul 2023", color: "bg-pink-500" },
      { name: "Self-Learner", description: "Answered your own question", earned: "Aug 2023", color: "bg-indigo-500" },
      { name: "Teacher", description: "Answered question with score of 1 or more", earned: "Sep 2023", color: "bg-orange-500" },
      { name: "Student", description: "Asked question with score of 1 or more", earned: "Oct 2023", color: "bg-teal-500" }
    ],
    recentQuestions: [
      {
        id: 1,
        title: "How to optimize React component re-renders?",
        votes: 8,
        answers: 3,
        views: 156,
        createdAt: "2 days ago"
      },
      {
        id: 2,
        title: "TypeScript generic constraints best practices",
        votes: 12,
        answers: 5,
        views: 234,
        createdAt: "1 week ago"
      }
    ],
    recentAnswers: [
      {
        id: 1,
        questionTitle: "Understanding React useEffect cleanup",
        votes: 15,
        accepted: true,
        createdAt: "1 day ago"
      },
      {
        id: 2,
        questionTitle: "CSS Grid vs Flexbox comparison",
        votes: 7,
        accepted: false,
        createdAt: "3 days ago"
      }
    ],
    activityData: [
      { date: "2023-10-01", count: 3 },
      { date: "2023-10-02", count: 1 },
      { date: "2023-10-03", count: 5 },
      { date: "2023-10-04", count: 2 },
      { date: "2023-10-05", count: 4 },
      { date: "2023-10-06", count: 1 },
      { date: "2023-10-07", count: 0 }
    ]
  };

  const reputationToNextLevel = 500;
  const currentLevelProgress = (profileData.stats.reputation % reputationToNextLevel) / reputationToNextLevel * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback className="text-2xl gradient-bg text-white">
                  {user?.username?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="rounded-full">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user?.username}</h1>
                  <p className="text-muted-foreground mb-4">{profileData.bio}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {profileData.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <a href={profileData.website} className="text-primary hover:underline">
                        {profileData.website}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Github className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <Button variant="outline" className="rounded-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
              
              {/* Reputation Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Reputation Level</span>
                  <span className="text-sm text-muted-foreground">
                    {profileData.stats.reputation} / {Math.ceil(profileData.stats.reputation / reputationToNextLevel) * reputationToNextLevel}
                  </span>
                </div>
                <Progress value={currentLevelProgress} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{profileData.stats.reputation}</div>
            <div className="text-xs text-muted-foreground">Reputation</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{profileData.stats.questionsAsked}</div>
            <div className="text-xs text-muted-foreground">Questions</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{profileData.stats.answersGiven}</div>
            <div className="text-xs text-muted-foreground">Answers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-1">{profileData.stats.badgesEarned}</div>
            <div className="text-xs text-muted-foreground">Badges</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{profileData.stats.helpfulVotes}</div>
            <div className="text-xs text-muted-foreground">Helpful Votes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{profileData.stats.bestAnswers}</div>
            <div className="text-xs text-muted-foreground">Best Answers</div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="answers">Answers</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Activity Graph */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Activity Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1">
                {profileData.activityData.map((day, index) => (
                  <div
                    key={index}
                    className={`w-full h-8 rounded ${
                      day.count === 0 ? 'bg-muted' :
                      day.count <= 2 ? 'bg-green-200' :
                      day.count <= 4 ? 'bg-green-400' : 'bg-green-600'
                    }`}
                    title={`${day.count} contributions on ${day.date}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Recent Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileData.recentQuestions.map((question) => (
                  <div key={question.id} className="border-b border-border pb-4 last:border-0">
                    <h3 className="font-medium mb-2 hover:text-primary cursor-pointer">
                      {question.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{question.votes} votes</span>
                      <span>{question.answers} answers</span>
                      <span>{question.views} views</span>
                      <span>{question.createdAt}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ThumbsUp className="w-5 h-5" />
                  Recent Answers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profileData.recentAnswers.map((answer) => (
                  <div key={answer.id} className="border-b border-border pb-4 last:border-0">
                    <h3 className="font-medium mb-2 hover:text-primary cursor-pointer">
                      {answer.questionTitle}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{answer.votes} votes</span>
                      {answer.accepted && (
                        <Badge className="bg-green-100 text-green-800">
                          ✓ Accepted
                        </Badge>
                      )}
                      <span>{answer.createdAt}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="questions" className="space-y-4">
          {profileData.recentQuestions.map((question) => (
            <Card key={question.id}>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3 hover:text-primary cursor-pointer">
                  {question.title}
                </h3>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{question.votes} votes</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>{question.answers} answers</span>
                  </div>
                  <span>{question.views} views</span>
                  <span>Asked {question.createdAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="answers" className="space-y-4">
          {profileData.recentAnswers.map((answer) => (
            <Card key={answer.id}>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3 hover:text-primary cursor-pointer">
                  {answer.questionTitle}
                </h3>
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{answer.votes} votes</span>
                  </div>
                  {answer.accepted && (
                    <Badge className="bg-green-100 text-green-800">
                      ✓ Accepted Answer
                    </Badge>
                  )}
                  <span>Answered {answer.createdAt}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="badges">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profileData.badges.map((badge, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${badge.color}`}>
                      <Award className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {badge.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Earned {badge.earned}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
