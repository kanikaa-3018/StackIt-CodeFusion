
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { HelpCircle, Tag, Lightbulb, X, Sparkles, Target, Users } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

const AddQuestion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");

  const suggestedTags = [
    "javascript", "react", "python", "typescript", "nodejs", 
    "css", "html", "api", "database", "git", "debugging",
    "algorithms", "web-development", "frontend", "backend"
  ];

  const handleAddTag = (tagToAdd: string) => {
    if (tagToAdd && !tags.includes(tagToAdd) && tags.length < 5) {
      setTags([...tags, tagToAdd.toLowerCase()]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      handleAddTag(currentTag.trim());
    }
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || tags.length === 0) {
      toast({
        title: "Incomplete Question",
        description: "Please fill in all required fields and add at least one tag.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Question Posted! 🎉",
      description: "Your question has been posted successfully and is now visible to the community.",
    });
    
    navigate("/home");
  };

  const getTitleValidation = () => {
    if (title.length === 0) return { color: "text-muted-foreground", message: "Start typing your question..." };
    if (title.length < 15) return { color: "text-yellow-600", message: "Make it more descriptive" };
    if (title.length > 150) return { color: "text-destructive", message: "Too long, keep it concise" };
    return { color: "text-green-600", message: "Perfect length!" };
  };

  const getContentValidation = () => {
    if (content.length === 0) return { color: "text-muted-foreground", message: "Provide details about your problem" };
    if (content.length < 50) return { color: "text-yellow-600", message: "Add more context and details" };
    return { color: "text-green-600", message: "Great detail!" };
  };

  const titleValidation = getTitleValidation();
  const contentValidation = getContentValidation();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-8">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-8 border border-primary/10">
        <div className="absolute top-4 right-4 opacity-10">
          <HelpCircle className="w-32 h-32" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ask a Question
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                Share your coding challenge with our community of developers
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl border border-border/50">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Be specific about your problem</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl border border-border/50">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Include code examples</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl border border-border/50">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium">Help others learn too</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-3 space-y-6">
          {/* Enhanced Title Input */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <span>Question Title</span>
                <span className="text-destructive text-lg">*</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="e.g., How to implement user authentication in React with TypeScript?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg h-14 px-4 border-2 focus:border-primary/50 transition-colors"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Be specific and imagine you're asking a question to another developer
                </p>
                <div className="text-right">
                  <p className={`text-sm font-medium ${titleValidation.color}`}>
                    {titleValidation.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {title.length}/150 characters
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Content Editor */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <span>Question Details</span>
                <span className="text-destructive text-lg">*</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Provide all the details about your problem. Include any error messages, code snippets, and what you've tried so far..."
                minHeight="400px"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Include details about your problem, what you've tried, and expected results
                </p>
                <div className="text-right">
                  <p className={`text-sm font-medium ${contentValidation.color}`}>
                    {contentValidation.message}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {content.length} characters
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Tags */}
          <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Tag className="w-6 h-6 text-primary" />
                <span>Tags</span>
                <span className="text-destructive text-lg">*</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="tags" className="text-base font-medium">
                  Add up to 5 tags to describe your question
                </Label>
                
                {/* Current Tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-xl border border-border">
                    {tags.map((tag) => (
                      <Badge 
                        key={tag} 
                        variant="secondary" 
                        className="tag-chip text-sm px-3 py-1.5 hover:bg-primary/20 transition-colors group"
                      >
                        {tag}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="ml-2 h-5 w-5 p-0 hover:bg-destructive hover:text-destructive-foreground rounded-full group-hover:opacity-100 opacity-70"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}

                <Input
                  id="tags"
                  placeholder="Type a tag and press Enter"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={tags.length >= 5}
                  className="h-12 px-4 border-2 focus:border-primary/50"
                />
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Popular tags:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags
                    .filter(tag => !tags.includes(tag))
                    .slice(0, 8)
                    .map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleAddTag(tag)}
                      disabled={tags.length >= 5}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <p className={`text-sm font-medium ${tags.length === 0 ? "text-destructive" : "text-green-600"}`}>
                  {tags.length}/5 tags selected
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Submit Section */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={handleSubmit}
              size="lg"
              className="gradient-bg text-white hover:opacity-90 rounded-full px-12 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Post Question 🚀
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full px-8 h-14 text-lg hover:bg-muted transition-colors"
              onClick={() => navigate("/home")}
            >
              Cancel
            </Button>
          </div>
        </div>

        {/* Enhanced Sidebar */}
        <div className="space-y-6">
          {/* Writing Tips */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                Writing Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                  <p className="font-semibold text-primary mb-2">Make it clear:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Use a descriptive, specific title</li>
                    <li>• Explain your exact problem</li>
                    <li>• Show what you've already tried</li>
                  </ul>
                </div>
                
                <div className="p-3 bg-accent/5 rounded-lg border border-accent/10">
                  <p className="font-semibold text-accent mb-2">Include details:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Error messages (full stack trace)</li>
                    <li>• Relevant code snippets</li>
                    <li>• Expected vs actual results</li>
                    <li>• Your development environment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Question Stats */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg">Question Quality</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">Title quality:</span>
                  <Badge variant={title.length >= 15 && title.length <= 150 ? "default" : "secondary"}>
                    {title.length >= 15 && title.length <= 150 ? "Good" : "Needs work"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">Content detail:</span>
                  <Badge variant={content.length >= 50 ? "default" : "secondary"}>
                    {content.length >= 50 ? "Detailed" : "Add more"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center p-2 rounded-lg bg-muted/30">
                  <span className="text-muted-foreground">Tags:</span>
                  <Badge variant={tags.length > 0 ? "default" : "secondary"}>
                    {tags.length}/5
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Community Guidelines */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-2 border-dashed border-muted-foreground/20">
            <CardHeader>
              <CardTitle className="text-lg text-center">📝 Quick Reminder</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-center text-muted-foreground leading-relaxed">
                Great questions help everyone learn! Take a moment to search existing questions before posting.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
