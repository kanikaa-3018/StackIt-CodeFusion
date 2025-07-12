
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, Code } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="text-center max-w-md space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 gradient-bg rounded-2xl flex items-center justify-center">
            <Code className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* 404 */}
        <div className="space-y-4">
          <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground text-lg">
            Oops! The page you're looking for doesn't exist. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="gradient-bg text-white hover:opacity-90 rounded-full w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button variant="outline" className="rounded-full w-full sm:w-auto" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Suggestions */}
        <div className="text-left bg-card/50 p-6 rounded-xl border border-border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Search className="w-4 h-4" />
            What can you do?
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Check the URL for typos</li>
            <li>• Browse questions on our homepage</li>
            <li>• Ask a new question</li>
            <li>• Contact support if you think this is an error</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
