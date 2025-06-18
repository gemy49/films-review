'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function TMDBSessionHandler() {
  const searchParams = useSearchParams();
  const tokenFromURL = searchParams.get('request_token');

  useEffect(() => {
    const handleTMDBSession = async () => {
      const requestToken = tokenFromURL || localStorage.getItem('request_token');
      if (!requestToken) return;

      localStorage.setItem('request_token', requestToken);

      const existingSession = localStorage.getItem('session_id');
      const existingAccount = localStorage.getItem('account_id');
      if (existingSession && existingAccount) return;

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/authentication/session/new?api_key=${TMDB_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ request_token: requestToken }),
          }
        );
        const data = await res.json();

        if (data.success && data.session_id) {
          localStorage.setItem('session_id', data.session_id);

          const accountRes = await fetch(
            `https://api.themoviedb.org/3/account?api_key=${TMDB_API_KEY}&session_id=${data.session_id}`
          );
          const accountData = await accountRes.json();

          if (accountData.id) {
            localStorage.setItem('account_id', accountData.id);
          } else {
            console.warn('⚠️ session_id valid but account_id missing. Retrying might help.');
          }

         
          const url = new URL(window.location.href);
          url.searchParams.delete('request_token');
          window.history.replaceState({}, document.title, url.toString());

         
          setTimeout(() => {
            window.location.reload();
          }, 10); 
        } else {
          console.error('❌ Session creation failed. Token may be unapproved.');
        }
      } catch (err) {
        console.error('❌ TMDB session error:', err);
      }
    };

    handleTMDBSession();
  }, [tokenFromURL]);

  return null;
}
