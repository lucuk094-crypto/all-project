// Error logging utility
// Only logs in development mode to avoid ESLint warnings

export function logError(context: string, error: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context}]`, error);
  }
}

export function logWarning(context: string, message: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[${context}]`, message);
  }
}

export function logInfo(context: string, message: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[${context}]`, message);
  }
}
