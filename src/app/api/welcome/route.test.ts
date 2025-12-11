import { describe, it, expect } from 'vitest';
import { POST } from './route';
import { createRequest } from '@/test/utils';

describe('POST /api/welcome', () => {
  it('returns welcome message for valid name', async () => {
    const request = createRequest('/api/welcome', { name: 'John' });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual({ message: 'Welcome John!' });
  });

  it('returns 400 for missing name', async () => {
    const request = createRequest('/api/welcome', {});
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
  });

  it('returns 400 for empty name', async () => {
    const request = createRequest('/api/welcome', { name: '' });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Name is required');
  });

  it('returns 400 for invalid JSON', async () => {
    const request = createRequest('/api/welcome', 'invalid json', {
      rawBody: true,
    });
    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Invalid JSON body');
  });
});
