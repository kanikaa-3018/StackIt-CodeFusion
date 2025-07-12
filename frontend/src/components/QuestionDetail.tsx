import React, { useState } from 'react';
import { ChevronUp, ChevronDown, MessageCircle, Eye, Clock, User, Award, ArrowLeft, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from './RichTextEditor';

interface Question {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    reputation: number;
    avatar?: string;
    badges: string[];
  };
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  createdAt: Date;
  hasAcceptedAnswer: boolean;
}

interface Answer {
  id: string;
  content: string;
  author: {
    name: string;
    reputation: number;
    badges: string[];
  };
  votes: number;
  isAccepted: boolean;
  createdAt: Date;
}

interface QuestionDetailProps {
  question: Question;
  onBack: () => void;
  onTagClick: (tag: string) => void;
}

const mockAnswers: Answer[] = [
  {
    id: '1',
    content: 'You can handle async/await with proper try-catch blocks. Here\'s the best approach: wrap your async calls in try-catch, handle loading states with useState, and always provide user feedback for errors.',
    author: {
      name: 'John Developer',
      reputation: 2340,
      badges: ['🏆', '⭐', '🔥']
    },
    votes: 15,
    isAccepted: true,
    createdAt: new Date('2024-01-11')
  },
  {
    id: '2',
    content: 'Another approach is to use custom hooks for error handling. This way you can centralize your error logic and reuse it across components.',
    author: {
      name: 'Jane Smith',
      reputation: 1850,
      badges: ['💡', '🚀']
    },
    votes: 8,
    isAccepted: false,
    createdAt: new Date('2024-01-12')
  }
];

const QuestionDetail: React.FC<QuestionDetailProps> = ({ question, onBack, onTagClick }) => {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [votes, setVotes] = useState(question.votes);
  const [answers] = useState(mockAnswers);
  const [newAnswer, setNewAnswer] = useState('');
  const { toast } = useToast();

  const handleVote = (type: 'up' | 'down') => {
    console.log(`Voting ${type} on question ${question.id}`);
    
    if (userVote === type) {
      setUserVote(null);
      setVotes(type === 'up' ? votes - 1 : votes + 1);
      toast({
        title: "Vote removed",
        description: `Your ${type}vote has been removed.`,
      });
    } else {
      const voteChange = userVote ? (type === 'up' ? 2 : -2) : (type === 'up' ? 1 : -1);
      setUserVote(type);
      setVotes(votes + voteChange);
      toast({
        title: "Vote recorded",
        description: `You ${type}voted this question.`,
      });
    }
  };

  const handleSubmitAnswer = () => {
    if (!newAnswer.trim()) {
      toast({
        title: "Error",
        description: "Please enter an answer before submitting.",
        variant: "destructive"
      });
      return;
    }

    console.log('Submitting answer:', newAnswer);
    toast({
      title: "Answer Submitted",
      description: "Your answer has been posted successfully!",
    });
    setNewAnswer('');
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
    <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-4 p-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Questions
      </Button>

      <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Vote Section */}
          <div className="flex sm:flex-col items-center sm:items-start space-x-4 sm:space-x-0 sm:space-y-2 min-w-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleVote('up')}
              className={`h-10 w-10 ${
                userVote === 'up'
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <ChevronUp className="w-5 h-5" />
            </Button>
            <span className={`font-bold text-lg ${
              votes > 0 ? 'text-green-600' : votes < 0 ? 'text-red-600' : 'text-muted-foreground'
            }`}>
              {votes}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleVote('down')}
              className={`h-10 w-10 ${
                userVote === 'down'
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <ChevronDown className="w-5 h-5" />
            </Button>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 text-card-foreground">
              {question.title}
            </h1>
            
            <div className="prose prose-sm sm:prose max-w-none mb-6 text-card-foreground">
              <p>{question.content}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {question.tags.map((tag) => (
                <button
                  key={tag}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(tag)} cursor-pointer hover:opacity-80 transition-opacity`}
                  onClick={() => {
                    onTagClick(tag);
                    onBack();
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Question Stats and Author */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span className={question.hasAcceptedAnswer ? 'text-green-600 font-medium' : ''}>
                    {question.answers} answers
                  </span>
                  {question.hasAcceptedAnswer && (
                    <Award className="w-3 h-3 text-green-600" />
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{question.views} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Asked {question.createdAt.toLocaleDateString()}</span>
                </div>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">{question.author.name}</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-muted-foreground">{question.author.reputation}</span>
                    <div className="flex space-x-1">
                      {question.author.badges.map((badge, index) => (
                        <span key={index} className="text-xs">{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      <div className="space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold text-card-foreground">
          {answers.length} Answer{answers.length !== 1 ? 's' : ''}
        </h2>

        {answers.map((answer) => (
          <div key={answer.id} className={`bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm ${
            answer.isAccepted ? 'ring-2 ring-green-500' : ''
          }`}>
            {answer.isAccepted && (
              <div className="flex items-center space-x-2 mb-4 text-green-600">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Accepted Answer</span>
              </div>
            )}

            <div className="prose prose-sm sm:prose max-w-none mb-4 text-card-foreground">
              <p>{answer.content}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <span className="font-medium">{answer.votes}</span>
                  <Button variant="ghost" size="sm">
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Flag className="w-4 h-4 mr-1" />
                  Flag
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">{answer.author.name}</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-muted-foreground">{answer.author.reputation}</span>
                    <div className="flex space-x-1">
                      {answer.author.badges.map((badge, index) => (
                        <span key={index} className="text-xs">{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Answer Section with Rich Text Editor */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-card-foreground">Your Answer</h3>
          <RichTextEditor
            value={newAnswer}
            onChange={setNewAnswer}
            placeholder="Write your answer here... You can format text, add links, and insert images."
            className="mb-4"
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmitAnswer} className="px-6">
              Post Your Answer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
