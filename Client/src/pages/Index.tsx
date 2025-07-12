
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Moon, Sun, MessageSquare, Users, Trophy, Zap, ArrowRight, Star, Code, Heart } from "lucide-react";

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: MessageSquare,
      title: "Ask & Answer",
      description: "Get help from the community and share your knowledge with others",
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Connect",
      description: "Build relationships with fellow developers and grow together",
      color: "bg-green-500"
    },
    {
      icon: Trophy,
      title: "Earn Reputation",
      description: "Build your profile with badges, streaks, and community recognition",
      color: "bg-yellow-500"
    },
    {
      icon: Zap,
      title: "Fast & Modern",
      description: "Enjoy a lightning-fast, beautiful interface designed for developers",
      color: "bg-purple-500"
    }
  ];

  const stats = [
    { label: "Questions Asked", value: "12,847", icon: MessageSquare },
    { label: "Active Developers", value: "3,421", icon: Users },
    { label: "Problems Solved", value: "9,156", icon: Trophy },
    { label: "Code Snippets", value: "18,293", icon: Code }
  ];

  if (user) {
    navigate("/home");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                StackIt
              </h1>
              <p className="text-xs text-muted-foreground">by Team CodeFusion</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </Button>
            <Link to="/login">
              <Button variant="ghost" className="rounded-full">Login</Button>
            </Link>
            <Link to="/signup">
              <Button className="rounded-full gradient-bg text-white hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
            🚀 Built for Young Developers
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Ask, Learn & 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
              Grow Together
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Join thousands of student developers in our collaborative Q&A platform. 
            Get answers, share knowledge, and build your coding journey together.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button size="lg" className="rounded-full gradient-bg text-white hover:opacity-90 text-lg px-8 py-6">
                Start Asking Questions
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="rounded-full text-lg px-8 py-6">
              Explore Questions
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose StackIt?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed specifically for student developers with features that matter most
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 border-0 bg-card/50 backdrop-blur-sm ${
                activeFeature === index ? 'ring-2 ring-primary' : ''
              }`}
              onMouseEnter={() => setActiveFeature(index)}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="gradient-bg text-white border-0">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Heart className="w-6 h-6" />
                  </div>
                ))}
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Start your journey today and become part of the most supportive developer community
            </p>
            
            <div className="flex justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="rounded-full text-lg px-8 py-6">
                  Join StackIt Now
                  <Star className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold">StackIt</span>
          </div>
          <p className="text-muted-foreground">
            Built with ❤️ by Team CodeFusion • Empowering the next generation of developers
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
