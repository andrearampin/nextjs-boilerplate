import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const WelcomeRequestSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

interface WelcomeResponse {
  message: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<WelcomeResponse | { error: string }>> {
  try {
    const body = await request.json();

    const result = WelcomeRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error.issues[0]?.message ?? 'Invalid request' },
        { status: 400 }
      );
    }

    const { name } = result.data;

    return NextResponse.json({ message: `Welcome, ${name}!` });
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
}
