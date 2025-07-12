
import { ERROR_MESSAGES } from '@/config/constants';

export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NetworkError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends Error {
  constructor(message: string = ERROR_MESSAGES.UNAUTHORIZED) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export const handleError = (error: unknown): AppError => {
  const timestamp = new Date();

  if (error instanceof ValidationError) {
    return {
      code: 'VALIDATION_ERROR',
      message: error.message,
      details: { field: error.field },
      timestamp
    };
  }

  if (error instanceof NetworkError) {
    return {
      code: 'NETWORK_ERROR',
      message: error.status === 404 ? ERROR_MESSAGES.QUESTION_NOT_FOUND : ERROR_MESSAGES.NETWORK_ERROR,
      details: { status: error.status },
      timestamp
    };
  }

  if (error instanceof AuthenticationError) {
    return {
      code: 'AUTH_ERROR',
      message: error.message,
      timestamp
    };
  }

  // Generic error handling
  if (error instanceof Error) {
    console.error('Unhandled error:', error);
    return {
      code: 'GENERIC_ERROR',
      message: ERROR_MESSAGES.GENERIC_ERROR,
      details: { originalMessage: error.message },
      timestamp
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: ERROR_MESSAGES.GENERIC_ERROR,
    timestamp
  };
};

export const logError = (error: AppError, context?: string) => {
  console.error(`[${error.timestamp.toISOString()}] ${context || 'Application'} Error:`, {
    code: error.code,
    message: error.message,
    details: error.details
  });
};

// Error boundary utility
export const withErrorBoundary = <T extends Record<string, any>>(
  Component: React.ComponentType<T>
) => {
  return function WrappedComponent(props: T) {
    try {
      return <Component {...props} />;
    } catch (error) {
      const appError = handleError(error);
      logError(appError, Component.name);
      
      return (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
          <p className="text-destructive font-medium">Something went wrong</p>
          <p className="text-sm text-muted-foreground mt-1">
            {appError.message}
          </p>
        </div>
      );
    }
  };
};
