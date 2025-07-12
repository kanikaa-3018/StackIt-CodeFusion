

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';

import QuestionCard from '../components/QuestionCard';
import QuestionDetail from '../components/QuestionDetail';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import AskQuestion from '../components/AskQuestion';
import MobileNavigation from '../components/MobileNavigation';
import Pagination from '../components/Pagination';
import { useToast } from '@/hooks/use-toast';
import { useDebounce, usePagination, questionsCache } from '@/utils/performance';
import { handleError, logError } from '@/utils/errorHandler';
import { APP_CONFIG, FILTER_OPTIONS, SUCCESS_MESSAGES } from '@/config/constants';
import { validateSearch } from '@/utils/validation';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAskQuestion, setShowAskQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [questions, setQuestions] = useState(mockQuestions);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('newest');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ search?: string; filter?: string }>({});


const debouncedSearchQuery = useDebounce(searchQuery);

  const filteredQuestions = useMemo(() => {
    try {
      let filtered = [...questions];

      // Apply search filter with validation
      if (debouncedSearchQuery) {
        const searchValidation = validateSearch(debouncedSearchQuery);
        if (!searchValidation.success) {
          setErrors(prev => ({ ...prev, search: searchValidation.errors[0]?.message || 'Invalid search query' }));
          return filtered;
        }
        
        setErrors(prev => ({ ...prev, search: undefined }));
        const query = searchValidation.data.toLowerCase();
        
        filtered = filtered.filter(q => 
          q.title.toLowerCase().includes(query) ||
          q.content.toLowerCase().includes(query) ||
          q.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }

      // Apply tag filter
      if (activeTag) {
        filtered = filtered.filter(q => q.tags.includes(activeTag));
      }

      // Apply sorting filter
      switch (activeFilter) {
        case 'newest':
          filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          break;
        case 'oldest':
          filtered.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
          break;
        case 'most-voted':
          filtered.sort((a, b) => b.votes - a.votes);
          break;
        case 'unanswered':
          filtered = filtered.filter(q => q.answers === 0);
          break;
        case 'bounty':
          filtered = filtered.filter(q => q.votes > 30);
          break;
        default:
          break;
      }

      // Cache filtered results
      questionsCache.set(`filtered_${activeFilter}_${activeTag}_${debouncedSearchQuery}`, filtered);
      
      return filtered;
    } catch (error) {
      const appError = handleError(error);
      logError(appError, 'QuestionFiltering');
      setErrors(prev => ({ ...prev, filter: appError.message }));
      return questions;
    }
  }, [questions, debouncedSearchQuery, activeFilter, activeTag]);

  // Pagination
  const {
    currentPage: paginationPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    hasNext,
    hasPrevious
  } = usePagination(filteredQuestions.length, APP_CONFIG.QUESTIONS_PER_PAGE);

  const paginatedQuestions = useMemo(() => {
    return filteredQuestions.slice(startIndex, endIndex);
  }, [filteredQuestions, startIndex, endIndex]);

  // Event handlers with error handling
  const handlePageChange = useCallback((page: string) => {
    try {
      console.log(`Navigating to page: ${page}`);
      setCurrentPage(page);
      setSidebarOpen(false);
      setSelectedQuestion(null);

      if (page === 'ask') {
        setShowAskQuestion(true);
      }
    } catch (error) {
      const appError = handleError(error);
      logError(appError, 'PageNavigation');
      toast({
        title: "Navigation Error",
        description: appError.message,
        variant: "destructive"
      });
    }
  }, [toast]);

  const handleQuestionClick = useCallback((questionId: string) => {
    try {
      console.log(`Clicked question: ${questionId}`);
      setSelectedQuestion(questionId);
      setCurrentPage('question-detail');
      toast({
        title: "Question Selected",
        description: "Loading question details...",
      });
    } catch (error) {
      const appError = handleError(error);
      logError(appError, 'QuestionClick');
      toast({
        title: "Error",
        description: appError.message,
        variant: "destructive"
      });
    }
  }, [toast]);

  const handleSearch = useCallback((query: string) => {
    console.log(`Searching for: ${query}`);
    setSearchQuery(query);
    goToPage(1); // Reset to first page when searching
  }, [goToPage]);

  const handleFilterChange = useCallback((filter: string) => {
    console.log(`Filter changed to: ${filter}`);
    setActiveFilter(filter);
    goToPage(1); // Reset to first page when filtering
  }, [goToPage]);

  const handleTagClick = useCallback((tag: string) => {
    console.log(`Tag clicked: ${tag}`);
    setActiveTag(activeTag === tag ? null : tag);
    setCurrentPage('home');
    goToPage(1); // Reset to first page when filtering by tag
    toast({
      title: "Tag Filter Applied",
      description: `Showing questions tagged with "${tag}".`,
    });
  }, [activeTag, goToPage, toast]);

  const handleLogoClick = () => {
    console.log('Logo clicked, navigating to home');
    setCurrentPage('home');
    setSelectedQuestion(null);
    setActiveTag(null);
    setSearchQuery('');
    setActiveFilter('newest');
    setSidebarOpen(false);
    goToPage(1);
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    console.log('Loading more questions...');
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "More Questions Loaded",
        description: "Additional questions have been loaded successfully.",
      });
      setLoadingMore(false);
    }, 1000);
  };

  const handleAskQuestion = () => {
    console.log('Opening ask question modal');
    setShowAskQuestion(true);
  };

  const handleNotificationClick = (type: string) => {
    console.log(`Notification clicked: ${type}`);
    switch (type) {
      case 'upvote':
      case 'comment':
        setCurrentPage('profile');
        break;
      case 'badge':
        setCurrentPage('profile');
        break;
      default:
        setCurrentPage('home');
    }
    toast({
      title: "Notification",
      description: "Navigating to relevant section...",
    });
  };

  useEffect(() => {
    if (!user && currentPage !== 'auth') {
      setCurrentPage('auth');
    }
  }, [user, currentPage]);


  const selectedQuestionData = selectedQuestion ? questions.find(q => q.id === selectedQuestion) : null;


  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onLogoClick={handleLogoClick}
        onSearch={handleSearch}
        onNotificationClick={handleNotificationClick}
      />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          onTagClick={handleTagClick}
          activeTag={activeTag}
        />

        <main className="flex-1 md:ml-0">
          
          {currentPage === "home" && (
  <div className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
    {/* Welcome Section */}
    <div className="mb-6 md:mb-8">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-4 sm:p-6 mb-4 md:mb-6 border border-border">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-card-foreground">
          Welcome back, {user?.name}! 👋
        </h2>
        <p className="text-muted-foreground mb-4 text-sm sm:text-base">
          Ready to help fellow developers or ask your next question?
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🔥</span>
            <div>
              <p className="font-semibold text-card-foreground">
                {user?.streak} day streak
              </p>
              <p className="text-muted-foreground">Keep it up!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">⭐</span>
            <div>
              <p className="font-semibold text-card-foreground">
                {user?.reputation} reputation
              </p>
              <p className="text-muted-foreground">Great work!</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {user?.badges.map((badge, index) => (
                <span key={index} className="text-lg">
                  {badge}
                </span>
              ))}
            </div>
            <div>
              <p className="font-semibold text-card-foreground">Badges</p>
              <p className="text-muted-foreground">Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Error display */}
      {errors.search && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg">
          <p className="text-sm text-destructive">{errors.search}</p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 space-y-4 sm:space-y-0">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-card-foreground">
            Latest Questions{" "}
            {filteredQuestions.length > 0 &&
              `(${filteredQuestions.length})`}
          </h3>
          {activeTag && (
            <p className="text-sm text-muted-foreground mt-1">
              Filtered by tag:{" "}
              <span className="font-medium text-primary">{activeTag}</span>
              <button
                onClick={() => setActiveTag(null)}
                className="ml-2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear filter
              </button>
            </p>
          )}
        </div>
        <Button onClick={handleAskQuestion} className="font-medium w-full sm:w-auto">
          Ask Question
        </Button>
      </div>
    </div>

    {/* Questions Feed */}
    <div className="space-y-4 md:space-y-6">
      {paginatedQuestions.length > 0 ? (
        <>
          {paginatedQuestions.map((question) => (
            <QuestionCard
              key={question._id}
              question={question}
              onClick={() => handleQuestionClick(question._id)}
              onTagClick={handleTagClick}
            />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={paginationPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                className="bg-card border border-border rounded-lg p-2"
              />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No questions found matching your criteria.
          </p>
          <Button
            onClick={() => {
              setSearchQuery("");
              setActiveTag(null);
              setActiveFilter("newest");
              goToPage(1);
            }}
            variant="outline"
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>

    {/* Load More */}
    {filteredQuestions.length > 0 && (
      <div className="text-center mt-8">
        <Button
          variant="outline"
          onClick={handleLoadMore}
          disabled={loadingMore}
          className="px-6 py-3"
        >
          {loadingMore ? "Loading..." : "Load More Questions"}
        </Button>
      </div>
    )}
  </div>
)}


          {currentPage === "question-detail" && selectedQuestionData && (
            <QuestionDetail
              questionId={selectedQuestionData._id}
              onBack={() => setCurrentPage("home")}
              onTagClick={handleTagClick}
              currentUserId={user._id}
            />
          )}

          {currentPage === "profile" && (
            <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-card-foreground">
                      {user.name}
                    </h2>
                    <p className="text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">
                      Member since {user.joinedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary">
                      {user.reputation}
                    </p>
                    <p className="text-sm text-muted-foreground">Reputation</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {user.streak}
                    </p>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <div className="flex justify-center space-x-1 mb-2">
                      {user.badges.map((badge, index) => (
                        <span key={index} className="text-xl">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Badges Earned
                    </p>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold mb-4 text-card-foreground">
                    Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">
                        Questions Asked
                      </span>
                      <span className="font-medium text-card-foreground">
                        12
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">
                        Answers Given
                      </span>
                      <span className="font-medium text-card-foreground">
                        34
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">
                        Helpful Votes
                      </span>
                      <span className="font-medium text-card-foreground">
                        156
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentPage === "questions" && (
            <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
                <h2 className="text-xl sm:text-2xl font-bold text-card-foreground">
                  All Questions
                </h2>
                <Button
                  onClick={handleAskQuestion}
                  className="w-full sm:w-auto"
                >
                  Ask Question
                </Button>
              </div>
              <div className="space-y-4 md:space-y-6">
                {filteredQuestions.map((question) => (
                  <QuestionCard
                    key={question._id}
                    question={question}
                    onClick={() => handleQuestionClick(question._id)}
                    onTagClick={handleTagClick}
                  />
                ))}
              </div>
            </div>
          )}

          {currentPage === "tags" && (
            <div className="max-w-4xl mx-auto p-3 sm:p-4 md:p-6 pb-20 md:pb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-card-foreground mb-6">
                Popular Tags
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  "React",
                  "JavaScript",
                  "TypeScript",
                  "CSS",
                  "Node.js",
                  "Python",
                  "HTML",
                  "Git",
                ].map((tag) => (
                  <Button
                    key={tag}
                    variant={activeTag === tag ? "default" : "outline"}
                    className="h-16 sm:h-20 flex-col"
                    onClick={() => {
                      handleTagClick(tag);
                      setCurrentPage("home");
                    }}
                  >
                    <span className="font-semibold text-sm sm:text-base">
                      {tag}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 100) + 10} questions
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      <MobileNavigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      {showAskQuestion && (
        <AskQuestion onClose={() => setShowAskQuestion(false)} />
      )}
    </div>
  );


}

 

const Index = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;


