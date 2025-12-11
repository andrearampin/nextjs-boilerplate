'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

interface WelcomeResponse {
  message: string;
}

interface ErrorResponse {
  error: string;
}

async function postWelcome(name: string): Promise<WelcomeResponse> {
  const response = await fetch('/api/welcome', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.error);
  }

  return response.json();
}

export default function Home() {
  const [name, setName] = useState('');

  const mutation = useMutation({
    mutationFn: postWelcome,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(name);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-full max-w-md flex-col gap-6 px-4">
        {mutation.isSuccess && (
          <h1 className="text-center text-2xl font-semibold text-black dark:text-white">
            {mutation.data.message}
          </h1>
        )}

        {mutation.isError && (
          <p className="text-center text-red-600 dark:text-red-400">
            {mutation.error.message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="h-10 rounded-md border border-zinc-300 bg-white px-3 text-black placeholder:text-zinc-500 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder:text-zinc-400"
          />
          <Button type="submit" loading={mutation.isPending}>
            Submit
          </Button>
        </form>
      </main>
    </div>
  );
}
