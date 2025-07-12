import React, { useState } from 'react';
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Eye,
  Clock,
  User,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Author {
  _id: string;
  username: string;
  avatar?: string;
}

interface Question {
  _id: string;
  title: string;
  description: string;
  author: Author;
  tags: string[];
  votes: { userId: string; value: number }[];
  answersCount: number;
  views: number;
  createdAt: string; // ISO string from Mongo
  acceptedAnswer?: string;
}

interface QuestionCardProps {
  question: Question;
  onClick: () => void;
  onTagClick: (tag: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onClick,
  onTagClick,
}) => {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [voteCount, setVoteCount] = useState(
    question.votes.reduce((sum, vote) => sum + vote.value, 0)
  );
  const { toast } = useToast();

  const handleVote = (type: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();

    const value = type === 'up' ? 1 : -1;

    if (userVote === type) {
      setUserVote(null);
      setVoteCount(voteCount - value);
      toast({
        title: 'Vote removed',
        description: `Your ${type}vote has been removed.`,
      });
    } else {
      const voteChange = userVote ? value * 2 : value;
      setUserVote(type);
      setVoteCount(voteCount + voteChange);
      toast({
        title: 'Vote recorded',
        description: `You ${type}voted this question.`,
      });
    }
  };

  const getTagColor = (tag: string) => {
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    ];
    return colors[tag.length % colors.length];
  };

  return (
    <div
      className="bg-card border border-border rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group animate-fade-in"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Vote Section */}
        <div className="flex sm:flex-col items-center sm:items-start space-x-4 sm:space-x-0 sm:space-y-2 min-w-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleVote('up', e)}
            className={`h-8 w-8 sm:h-10 sm:w-10 ${
              userVote === 'up'
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
          <span
            className={`font-bold text-base sm:text-lg ${
              voteCount > 0
                ? 'text-green-600'
                : voteCount < 0
                ? 'text-red-600'
                : 'text-muted-foreground'
            }`}
          >
            {voteCount}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => handleVote('down', e)}
            className={`h-8 w-8 sm:h-10 sm:w-10 ${
              userVote === 'down'
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2 text-card-foreground">
            {question.title}
          </h3>

          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm sm:text-base">
            {question.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {question.tags.map((tag) => (
              <button
                key={tag}
                className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getTagColor(
                  tag
                )} cursor-pointer hover:opacity-80 transition-opacity`}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                  toast({
                    title: 'Tag Filter Applied',
                    description: `Showing questions tagged with "${tag}".`,
                  });
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Stats and Author */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                <span
                  className={
                    question.acceptedAnswer ? 'text-green-600 font-medium' : ''
                  }
                >
                  {question.answersCount}
                </span>
                {question.acceptedAnswer && (
                  <Award className="w-2 h-2 sm:w-3 sm:h-3 text-green-600" />
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{question.views}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">
                  {new Date(question.createdAt).toLocaleDateString()}
                </span>
                <span className="sm:hidden">
                  {new Date(question.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {/* Author */}
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-sm font-medium text-card-foreground">
                  {question.author?.username || 'Anonymous'}
                </p>
              </div>
              {question.author?.avatar ? (
                <img
                  src={question.author.avatar}
                  alt="avatar"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
