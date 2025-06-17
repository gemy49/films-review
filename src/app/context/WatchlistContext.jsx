'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [count, setCount] = useState(0);
  const [watchlistIds, setWatchlistIds] = useState([]);

  const sessionId = typeof window !== 'undefined' && localStorage.getItem('session_id');
  const accountId = typeof window !== 'undefined' && localStorage.getItem('account_id');

  const fetchCount = async () => {
    if (!sessionId || !accountId) return;
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&session_id=${sessionId}`
      );
      const data = await res.json();
      setWatchlistIds(data.results.map((m) => m.id));
      setCount(data.results.length);
    } catch (err) {
      console.error('Error fetching watchlist:', err);
    }
  };

  useEffect(() => {
    fetchCount();
  }, [accountId, sessionId]);

  return (
    <WatchlistContext.Provider value={{ count, fetchCount, watchlistIds }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  return useContext(WatchlistContext);
}
