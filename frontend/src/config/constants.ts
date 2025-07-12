
// Application constants
export const APP_CONFIG = {
  // Pagination
  QUESTIONS_PER_PAGE: 10,
  ANSWERS_PER_PAGE: 5,
  
  // Limits
  MAX_TAGS_PER_QUESTION: 5,
  MIN_QUESTION_TITLE_LENGTH: 10,
  MAX_QUESTION_TITLE_LENGTH: 150,
  MIN_QUESTION_CONTENT_LENGTH: 30,
  MAX_QUESTION_CONTENT_LENGTH: 5000,
  MIN_ANSWER_LENGTH: 20,
  MAX_ANSWER_LENGTH: 10000,
  MAX_SEARCH_QUERY_LENGTH: 100,
  
  // UI
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
  
  // Performance
  DEBOUNCE_DELAY: 300,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  
  // Features
  ENABLE_REAL_TIME: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_DARK_MODE: true,
} as const;

// Filter options
export const FILTER_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'most-voted', label: 'Most Voted' },
  { value: 'unanswered', label: 'Unanswered' },
  { value: 'bounty', label: 'Bounty' },
] as const;

// Sort options
export const SORT_OPTIONS = [
  { value: 'date', label: 'Date' },
  { value: 'votes', label: 'Votes' },
  { value: 'answers', label: 'Answers' },
  { value: 'views', label: 'Views' },
] as const;

// Popular tags (dynamic in real app)
export const POPULAR_TAGS = [
  'React', 'JavaScript', 'TypeScript', 'CSS', 
  'Node.js', 'Python', 'HTML', 'Git'
] as const;

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again later.',
  QUESTION_NOT_FOUND: 'Question not found.',
  UNAUTHORIZED: 'You need to be logged in to perform this action.',
  RATE_LIMIT: 'Too many requests. Please wait before trying again.',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  QUESTION_POSTED: 'Your question has been posted successfully!',
  ANSWER_POSTED: 'Your answer has been posted successfully!',
  VOTE_RECORDED: 'Your vote has been recorded.',
  QUESTION_UPDATED: 'Question updated successfully.',
  ANSWER_UPDATED: 'Answer updated successfully.',
} as const;
