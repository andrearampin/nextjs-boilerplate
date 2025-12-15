import { NextRequest } from 'next/server';

const BASE_URL = 'http://localhost:3000';

interface RequestOptions {
  method?: string;
  rawBody?: boolean;
}

/**
 * Creates a NextRequest object for testing API routes.
 *
 * @param path - The API route path (e.g., '/api/users')
 * @param body - The request body to send
 * @param options - Optional configuration
 * @param options.method - HTTP method (defaults to 'POST')
 * @param options.rawBody - If true, sends body as-is without JSON.stringify (defaults to false)
 * @returns A NextRequest instance configured for testing
 */
export function createRequest(
  path: string,
  body: unknown,
  options: RequestOptions = {}
): NextRequest {
  const { method = 'POST', rawBody = false } = options;
  return new NextRequest(`${BASE_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: rawBody ? (body as string) : JSON.stringify(body),
  });
}
