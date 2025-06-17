// /app/api/create-token/route.js (أو .ts لو بتشتغل TypeScript)

import { NextResponse } from 'next/server';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const redirect_to = searchParams.get('redirect_to') || 'http://localhost:3000';

  try {
    const response = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${TMDB_API_KEY}`);
    const data = await response.json();

    return NextResponse.json({ request_token: data.request_token });
  } catch (error) {
    console.error('Error creating request token:', error);
    return NextResponse.json({ error: 'Failed to create token' }, { status: 500 });
  }
}
