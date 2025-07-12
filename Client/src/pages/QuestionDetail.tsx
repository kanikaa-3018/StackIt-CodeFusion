
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "@/components/RichTextEditor";
import { 
  ArrowUp, 
  ArrowDown, 
  MessageCircle, 
  Eye, 
  Clock, 
  Check,
  Heart,
  ThumbsUp,
  Flame,
  Share2,
  Bookmark,
  Award,
  User,
  Calendar,
  GitBranch,
  ExternalLink,
  Flag,
  MoreHorizontal
} from "lucide-react";

const QuestionDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [newAnswer, setNewAnswer] = useState("");
  const [questionVoted, setQuestionVoted] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");

  // Enhanced mock data
  const mockQuestion = {
    id: 1,
    title: "How to implement authentication in React with TypeScript?",
    content: `I'm building a React app with TypeScript and need to implement user authentication. What's the best approach for handling login/logout states and protecting routes?

I've tried using localStorage to store tokens, but I'm not sure if this is the best practice. Here's what I have so far:

\`\`\`typescript
const [user, setUser] = useState(null);

useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    // Verify token and set user
  }
}, []);
\`\`\`

Any suggestions on better approaches or security considerations? I'm particularly concerned about:

1. **Token storage** - localStorage vs sessionStorage vs httpOnly cookies
2. **Route protection** - How to properly implement protected routes
3. **Token refresh** - Handling expired tokens gracefully
4. **Security** - What are the common vulnerabilities I should avoid?

I've looked at libraries like Auth0 and Firebase Auth, but I'd prefer to understand the underlying concepts first before using a third-party solution.`,
    author: {
      name: "CodeNewbie23",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      reputation: 145,
      badges: ["New Member", "First Question"],
      joinDate: "2 months ago",
      questionsAsked: 3,
      answersGiven: 1
    },
    votes: 12,
    views: 256,
    tags: ["react", "typescript", "authentication", "security"],
    createdAt: "2 hours ago",
    updatedAt: "1 hour ago",
    status: "open"
  };

  const mockAnswers = [
    {
      id: 1,
      content: `Great question! For React authentication with TypeScript, I'd recommend using **React Context** combined with custom hooks. Here's a comprehensive approach:

## 1. Create an Auth Context

\`\`\`typescript
// AuthContext.tsx
interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('authToken');
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('authToken', data.token);
        setUser(data.user);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};
\`\`\`

## 2. Protected Route Component

\`\`\`typescript
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};
\`\`\`

## Security Best Practices:

1. **Use httpOnly cookies** for production (more secure than localStorage)
2. **Implement token refresh** with short-lived access tokens
3. **Validate tokens server-side** on every request
4. **Use HTTPS** in production
5. **Implement CSRF protection**

This approach gives you:
- ✅ Centralized auth state
- ✅ Type safety with TypeScript
- ✅ Easy testing
- ✅ Better security than localStorage alone
- ✅ Automatic token verification

Would you like me to explain any specific part in more detail?`,
      author: {
        name: "ReactMaster",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
        reputation: 2840,
        badges: ["Expert", "Top Contributor", "React Specialist"],
        joinDate: "2 years ago",
        questionsAsked: 15,
        answersGiven: 180
      },
      votes: 18,
      isAccepted: true,
      reactions: { heart: 8, thumbsUp: 12, flame: 3 },
      createdAt: "1 hour ago",
      comments: [
        {
          id: 1,
          content: "This is exactly what I was looking for! The Context approach makes so much sense. Quick question - how would you handle token refresh?",
          author: "CodeNewbie23",
          createdAt: "30 minutes ago",
          votes: 2
        },
        {
          id: 2,
          content: "Great answer! I'd also recommend looking into React Query for managing auth state and API calls.",
          author: "DevExpert",
          createdAt: "25 minutes ago",
          votes: 1
        }
      ]
    },
    {
      id: 2,
      content: `Another solid approach is using **React Query** with auth tokens. It handles caching and background refetching automatically:

\`\`\`typescript
const { data: user, isLoading, error } = useQuery({
  queryKey: ['currentUser'],
  queryFn: async () => {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No token');
    
    const response = await fetch('/api/user/me', {
      headers: { Authorization: \`Bearer \${token}\` }
    });
    
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },
  retry: false,
  staleTime: 5 * 60 * 1000, // 5 minutes
});
\`\`\`

This works really well with JWT tokens and automatic token refresh. You can also combine it with the Context approach for the best of both worlds!

**Pro tip:** Use React Query's mutation for login/logout operations - it integrates beautifully with the query cache.`,
      author: {
        name: "DevExpert",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
        reputation: 1580,
        badges: ["Senior Developer", "React Query Expert"],
        joinDate: "1 year ago",
        questionsAsked: 8,
        answersGiven: 95
      },
      votes: 7,
      isAccepted: false,
      reactions: { heart: 3, thumbsUp: 5, flame: 1 },
      createdAt: "45 minutes ago",
      comments: []
    }
  ];

  const handleVote = (type: 'up' | 'down') => {
    const newVote = type === 'up' ? 1 : -1;
    setQuestionVoted(questionVoted === newVote ? 0 : newVote);
    toast({
      title: `Question ${type}voted! ${type === 'up' ? '👍' : '👎'}`,
      description: "Your vote has been recorded.",
    });
  };

  const handleAnswerSubmit = () => {
    if (!newAnswer.trim()) return;
    
    toast({
      title: "Answer posted! 🎉",
      description: "Your answer has been added to the discussion.",
    });
    setNewAnswer("");
  };

  const handleReaction = (answerId: number, reaction: string) => {
    toast({
      title: `Reaction added! ${reaction}`,
      description: "Thanks for engaging with the community!",
    });
  };

  const handleCommentSubmit = (answerId: number) => {
    if (!newComment.trim()) return;
    
    toast({
      title: "Comment added! 💬",
      description: "Your comment has been posted.",
    });
    setNewComment("");
    setShowCommentForm(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-8">
      {/* Enhanced Question Header */}
      <Card className="overflow-hidden border-2 hover:shadow-xl transition-all duration-300">
        <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 p-6 border-b">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold leading-tight mb-3">{mockQuestion.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Asked {mockQuestion.createdAt}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{mockQuestion.views} views</span>
                </div>
                <Badge variant={mockQuestion.status === 'open' ? 'default' : 'secondary'}>
                  {mockQuestion.status}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="rounded-full">
                <Flag className="w-4 h-4 mr-2" />
                Flag
              </Button>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {mockQuestion.tags.map((tag) => (
              <Link key={tag} to={`/tags/${tag}`}>
                <Badge variant="secondary" className="tag-chip hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* Vote Column */}
            <div className="flex flex-col items-center gap-3 min-w-20">
              <Button
                variant={questionVoted === 1 ? "default" : "outline"}
                size="icon"
                onClick={() => handleVote('up')}
                className="rounded-full h-12 w-12 hover:scale-110 transition-transform"
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
              <span className="text-2xl font-bold">{mockQuestion.votes + questionVoted}</span>
              <Button
                variant={questionVoted === -1 ? "destructive" : "outline"}
                size="icon"
                onClick={() => handleVote('down')}
                className="rounded-full h-12 w-12 hover:scale-110 transition-transform"
              >
                <ArrowDown className="w-5 h-5" />
              </Button>
              <Button
                variant={bookmarked ? "default" : "outline"}
                size="icon"
                onClick={() => setBookmarked(!bookmarked)}
                className="rounded-full h-10 w-10 mt-2 hover:scale-110 transition-transform"
              >
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div 
                className="prose prose-lg max-w-none mb-6 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: mockQuestion.content
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/`(.*?)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>')
                    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto"><code>$2</code></pre>')
                    .replace(/\n/g, '<br />')
                }}
              />
              
              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border-2 border-primary/20">
                    <AvatarImage src={mockQuestion.author.avatar} />
                    <AvatarFallback>{mockQuestion.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link to={`/users/${mockQuestion.author.name}`} className="font-semibold hover:text-primary transition-colors">
                        {mockQuestion.author.name}
                      </Link>
                      <div className="flex gap-1">
                        {mockQuestion.author.badges.map((badge) => (
                          <Badge key={badge} variant="outline" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {mockQuestion.author.reputation} rep
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Member for {mockQuestion.author.joinDate}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground text-right">
                  <p>asked {mockQuestion.createdAt}</p>
                  {mockQuestion.updatedAt !== mockQuestion.createdAt && (
                    <p>edited {mockQuestion.updatedAt}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Answers Section */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {mockAnswers.length} Answer{mockAnswers.length !== 1 ? 's' : ''}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-full">Oldest</Button>
          <Button variant="default" size="sm" className="rounded-full">Highest Score</Button>
          <Button variant="outline" size="sm" className="rounded-full">Newest</Button>
        </div>
      </div>

      {/* Enhanced Answers */}
      <div className="space-y-6">
        {mockAnswers.map((answer, index) => (
          <Card key={answer.id} className={`transition-all duration-300 hover:shadow-lg ${answer.isAccepted ? "border-2 border-green-200 bg-green-50/30 dark:bg-green-950/20 dark:border-green-800" : "border-2 hover:border-primary/20"}`}>
            {answer.isAccepted && (
              <div className="bg-green-100 dark:bg-green-900/30 px-6 py-2 border-b flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">Accepted Answer</span>
              </div>
            )}
            
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Vote Column */}
                <div className="flex flex-col items-center gap-3 min-w-20">
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10 hover:scale-110 transition-transform">
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <span className="text-xl font-bold">{answer.votes}</span>
                  <Button variant="outline" size="icon" className="rounded-full h-10 w-10 hover:scale-110 transition-transform">
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  {answer.isAccepted && (
                    <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/50 rounded-full">
                      <Check className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div 
                    className="prose prose-lg max-w-none mb-6 leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: answer.content
                        .replace(/## (.*)/g, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/`(.*?)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>')
                        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
                        .replace(/- ✅ (.*)/g, '<li class="flex items-center gap-2 text-green-600"><span class="text-green-500">✅</span> $1</li>')
                        .replace(/\n/g, '<br />')
                    }}
                  />
                  
                  {/* Reactions */}
                  <div className="flex items-center gap-3 mb-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReaction(answer.id, '❤️')}
                      className="rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {answer.reactions.heart}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReaction(answer.id, '👍')}
                      className="rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {answer.reactions.thumbsUp}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleReaction(answer.id, '🔥')}
                      className="rounded-full hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    >
                      <Flame className="w-4 h-4 mr-1" />
                      {answer.reactions.flame}
                    </Button>
                  </div>
                  
                  {/* Comments */}
                  {answer.comments.length > 0 && (
                    <div className="space-y-3 mb-4 pl-4 border-l-2 border-muted">
                      {answer.comments.map((comment) => (
                        <div key={comment.id} className="bg-muted/30 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                          <p className="text-sm mb-2">{comment.content}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">
                              <Link to={`/users/${comment.author}`} className="hover:text-primary">
                                {comment.author}
                              </Link>
                              {' • '}
                              {comment.createdAt}
                            </p>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" className="h-6 text-xs">
                                <ArrowUp className="w-3 h-3 mr-1" />
                                {comment.votes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Comment Form */}
                  {showCommentForm === answer.id && (
                    <div className="mb-4 p-4 bg-muted/20 rounded-lg border">
                      <RichTextEditor
                        value={newComment}
                        onChange={setNewComment}
                        placeholder="Add a comment..."
                        minHeight="120px"
                      />
                      <div className="flex gap-2 mt-3">
                        <Button 
                          onClick={() => handleCommentSubmit(answer.id)}
                          size="sm"
                          className="rounded-full"
                        >
                          Post Comment
                        </Button>
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => setShowCommentForm(null)}
                          className="rounded-full"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Actions and Author Info */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex gap-3">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-xs rounded-full"
                        onClick={() => setShowCommentForm(showCommentForm === answer.id ? null : answer.id)}
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Add comment
                      </Button>
                      <Button variant="ghost" size="sm" className="text-xs rounded-full">
                        <Share2 className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-xs text-muted-foreground text-right">
                        answered {answer.createdAt}
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={answer.author.avatar} />
                          <AvatarFallback className="text-xs">{answer.author.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-1">
                            <Link to={`/users/${answer.author.name}`} className="text-sm font-medium hover:text-primary transition-colors">
                              {answer.author.name}
                            </Link>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{answer.author.reputation} rep</span>
                            <div className="flex gap-1">
                              {answer.author.badges.slice(0, 2).map((badge) => (
                                <Badge key={badge} variant="outline" className="text-xs px-1 py-0">
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
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

      {/* Enhanced Answer Form */}
      <Card className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Your Answer</h3>
          </div>
          
          <RichTextEditor
            value={newAnswer}
            onChange={setNewAnswer}
            placeholder="Write your answer here... Be thorough and provide examples when possible!"
            minHeight="300px"
          />
          
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-muted-foreground max-w-md">
              <strong>Remember:</strong> Answer the question directly, provide examples, and explain your reasoning. Great answers help everyone learn!
            </p>
            <Button 
              onClick={handleAnswerSubmit}
              className="gradient-bg text-white hover:opacity-90 rounded-full px-8 h-12 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={!newAnswer.trim()}
            >
              Post Your Answer 🚀
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionDetail;
