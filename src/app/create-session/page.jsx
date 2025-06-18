'use client';
import { useEffect } from 'react';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function CreateSessionPage() {
  useEffect(() => {
    const getRequestToken = async () => {
      const res = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${TMDB_API_KEY}`);
      const data = await res.json();

      if (data.success) {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const redirectUrl = `${origin}/?request_token=${data.request_token}`;

        window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${redirectUrl}`;
      } else {
        console.error("❌ Failed to get request_token");
      }
    };

    getRequestToken();
  }, []);

  return <p className="text-center p-5">⏳ Generating token and redirecting...</p>;
}
