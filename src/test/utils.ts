import { NextRequest } from 'next/server';

const BASE_URL = 'http://localhost:3000';

interface RequestOptions {
  method?: string;
  rawBody?: boolean;
}

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
