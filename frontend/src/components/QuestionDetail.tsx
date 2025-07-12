import React, { useState, useEffect } from "react";
import { getAccessToken } from "../utils/tokenManager";
import {
  ChevronUp,
  ChevronDown,
  MessageCircle,
  Eye,
  Clock,
  User,
  Award,
  ArrowLeft,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import RichTextEditor from "./RichTextEditor";
import axios from "axios";

interface UserBadge {
  _id: string;
  username: string;
  avatar?: string;
}

interface Answer {
  _id: string;
  content: string;
  author: UserBadge;
  votes: { userId: string; value: number }[];
  isAccepted: boolean;
  createdAt: string;
}

interface Question {
  _id: string;
  title: string;
  description: string;
  author: UserBadge;
  tags: string[];
  votes: { userId: string; value: number }[];
  acceptedAnswer?: Answer;
  answers: Answer[];
  answersCount: number;
  views: number;
  createdAt: string;
}

interface QuestionDetailProps {
  questionId: string;
  onBack: () => void;
  onTagClick: (tag: string) => void;
  currentUserId: string;
}

const QuestionDetail: React.FC<QuestionDetailProps> = ({
  questionId,
  onBack,
  onTagClick,
  currentUserId,
}) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [userVote, setUserVote] = useState<number | null>(null);
  const [newAnswer, setNewAnswer] = useState("");
  const { toast } = useToast();

  useEffect(() => {
      console.log("access",getAccessToken())
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/questions/${questionId}`
        );
        setQuestion(res.data);
        console.log(questionId);
        console.log(res.data);

        const userVoteObj = res.data.votes.find(
          (v: any) => v.userId === currentUserId
        );
        setUserVote(userVoteObj ? userVoteObj.value : null);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to fetch question",
          variant: "destructive",
        });
      }
    };
    fetchQuestion();
  }, [questionId, currentUserId]);

  const calculateVoteTotal = (votes?: { value: number }[]) => {
    if (!Array.isArray(votes)) return 0;
    return votes.reduce((total, vote) => total + vote.value, 0);
  };

  const handleVote = async (type: "up" | "down") => {
    if (!question) return;
    const newVote = type === "up" ? 1 : -1;
    const existing = question.votes.find((v) => v.userId === currentUserId);
    const voteChange = existing ? newVote - existing.value : newVote;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/questions/${question._id}/vote`,
        { value: newVote },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }
      );

      const updatedVotes = existing
        ? question.votes.map((v) =>
            v.userId === currentUserId ? { ...v, value: newVote } : v
          )
        : [...question.votes, { userId: currentUserId, value: newVote }];
      setQuestion({ ...question, votes: updatedVotes });
      setUserVote(newVote);
    
      toast({
        title: "Vote submitted",
        description: `You ${type}voted this question.`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to vote",
        variant: "destructive",
      });
    }
  };

const handleSubmitAnswer = async () => {
  if (!newAnswer.trim()) {
    toast({
      title: "Error",
      description: "Answer cannot be empty.",
      variant: "destructive",
    });
    return;
  }

  try {
    const token = getAccessToken();
    console.log("aceesesese",token)
    if (!token) throw new Error("User not authenticated");

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/answers/${questionId}`,
      { content: newAnswer },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setNewAnswer("");
    toast({
      title: "Answer posted",
      description: "Your answer has been submitted.",
    });

    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/questions/${questionId}`);
    setQuestion(res.data);
  } catch (err: any) {
    toast({
      title: "Error",
      description: err?.response?.data?.message || "Failed to submit answer",
      variant: "destructive",
    });
  }
};

  const getTagColor = (tag: string) => {
    const colors = [
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
      "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    ];
    return colors[tag.length % colors.length];
  };

  if (!question) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20">
      <Button variant="ghost" onClick={onBack} className="mb-4 p-2">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Questions
      </Button>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-6">
        <div className="flex">
          <div className="flex flex-col items-center mr-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleVote("up")}
              className={`h-10 w-10 ${
                userVote === 1
                  ? "bg-green-500 text-white"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <ChevronUp className="w-5 h-5" />
            </Button>
            <span className="font-bold text-lg">
              {calculateVoteTotal(question?.votes)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleVote("down")}
              className={`h-10 w-10 ${
                userVote === -1
                  ? "bg-red-500 text-white"
                  : "hover:bg-muted text-muted-foreground"
              }`}
            >
              <ChevronDown className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-4">{question?.title}</h1>
            <div className="prose prose-sm mb-6">{question?.description}</div>
            <div className="flex flex-wrap gap-2 mb-6">
              {question?.tags?.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    onTagClick(tag);
                    onBack();
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(
                    tag
                  )} cursor-pointer`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" /> {question?.answersCount}{" "}
                  answers
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {question?.views} views
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />{" "}
                  {new Date(question?.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {question?.author?.username}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-lg font-semibold">
          {question?.answers?.length} Answer
          {question?.answers?.length !== 1 ? "s" : ""}
        </h2>
        {question?.answers?.map((answer) => (
          <div
            key={answer._id}
            className={`bg-card border rounded-xl p-6 ${
              answer?.isAccepted ? "ring-2 ring-green-500" : ""
            }`}
          >
            {answer?.isAccepted && (
              <div className="flex items-center text-green-600 mb-2">
                <Award className="w-4 h-4 mr-1" /> Accepted Answer
              </div>
            )}
            <div
              className="prose prose-sm mb-4"
              dangerouslySetInnerHTML={{ __html: answer?.content }}
            />
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <ChevronUp className="w-4 h-4" />
                </Button>
                <span>{calculateVoteTotal(answer?.votes)}</span>
                <Button variant="ghost" size="sm">
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Flag className="w-4 h-4 mr-1" /> Flag
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {answer?.author?.username}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-card border rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4">Your Answer</h3>
          <RichTextEditor
            value={newAnswer}
            onChange={setNewAnswer}
            placeholder="Write your answer here..."
            className="mb-4"
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmitAnswer}>Post Your Answer</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
