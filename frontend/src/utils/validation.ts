
import { z } from 'zod';

// Question validation schema
export const questionSchema = z.object({
  title: z.string()
    .min(10, 'Title must be at least 10 characters long')
    .max(150, 'Title cannot exceed 150 characters')
    .regex(/^[a-zA-Z0-9\s\-_?!.,;:()]+$/, 'Title contains invalid characters'),
  content: z.string()
    .min(30, 'Question details must be at least 30 characters long')
    .max(5000, 'Question details cannot exceed 5000 characters'),
  tags: z.array(z.string())
    .min(1, 'At least one tag is required')
    .max(5, 'Maximum 5 tags allowed')
    .refine(tags => tags.every(tag => tag.length >= 2 && tag.length <= 25), 
      'Each tag must be between 2 and 25 characters')
});

// Answer validation schema
export const answerSchema = z.object({
  content: z.string()
    .min(20, 'Answer must be at least 20 characters long')
    .max(10000, 'Answer cannot exceed 10000 characters')
});

// Search validation schema
export const searchSchema = z.object({
  query: z.string()
    .max(100, 'Search query cannot exceed 100 characters')
    .regex(/^[a-zA-Z0-9\s\-_?!.,;:()]*$/, 'Search query contains invalid characters')
});

// User input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

// Validation helper functions
export const validateQuestion = (data: unknown) => {
  try {
    return {
      success: true,
      data: questionSchema.parse(data),
      errors: []
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      };
    }
    return {
      success: false,
      data: null,
      errors: [{ field: 'general', message: 'Validation failed' }]
    };
  }
};

export const validateAnswer = (data: unknown) => {
  try {
    return {
      success: true,
      data: answerSchema.parse(data),
      errors: []
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      };
    }
    return {
      success: false,
      data: null,
      errors: [{ field: 'general', message: 'Validation failed' }]
    };
  }
};

export const validateSearch = (query: string) => {
  try {
    return {
      success: true,
      data: searchSchema.parse({ query }).query,
      errors: []
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      };
    }
    return {
      success: false,
      data: null,
      errors: [{ field: 'general', message: 'Search validation failed' }]
    };
  }
};
