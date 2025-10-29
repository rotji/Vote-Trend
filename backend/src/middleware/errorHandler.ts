// Basic error handling middleware for development
import { Request, Response, NextFunction } from 'express';

// Interface for custom errors
interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

// Create standardized error response
const createErrorResponse = (error: AppError, isDevelopment: boolean = true) => {
  const response: any = {
    success: false,
    error: error.message || 'Something went wrong',
    timestamp: new Date().toISOString(),
  };

  // Add more details in development
  if (isDevelopment) {
    response.stack = error.stack;
    response.statusCode = error.statusCode;
  }

  return response;
};

// Global error handler middleware
export const globalErrorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('🚨 Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Set default error values
  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'Internal Server Error';

  const isDevelopment = process.env.NODE_ENV === 'development';
  const errorResponse = createErrorResponse(error, isDevelopment);

  res.status(error.statusCode).json(errorResponse);
};

// Async error wrapper to catch async errors
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Custom error classes for different scenarios
export class ValidationError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
    this.isOperational = true;
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    this.isOperational = true;
    this.name = 'NotFoundError';
  }
}

export class DatabaseError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string) {
    super(message);
    this.statusCode = 500;
    this.isOperational = true;
    this.name = 'DatabaseError';
  }
}

// Handle unhandled promise rejections
export const handleUnhandledRejections = () => {
  process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
    console.error('🚨 Unhandled Promise Rejection:', reason);
    console.error('🚨 Promise:', promise);
    // Don't exit in development, just log the error
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  });
};

// Handle uncaught exceptions
export const handleUncaughtExceptions = () => {
  process.on('uncaughtException', (error: Error) => {
    console.error('🚨 Uncaught Exception:', error);
    // Don't exit in development, just log the error
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  });
};

export default {
  globalErrorHandler,
  asyncHandler,
  ValidationError,
  NotFoundError,
  DatabaseError,
  handleUnhandledRejections,
  handleUncaughtExceptions,
};