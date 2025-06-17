'use client';
import { useState, useEffect } from 'react';
import { useWatchlist } from '../context/WatchlistContext';

export default function WatchlistHeartButton({ movieId, onRemove }) {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const { watchlistIds, fetchCount } = useWatchlist();

  const session_id = typeof window !== 'undefined' && localStorage.getItem('session_id');
  const account_id = typeof window !== 'undefined' && localStorage.getItem('account_id');

  useEffect(() => {
    setAdded(watchlistIds.includes(movieId));
    setLoading(false);
  }, [watchlistIds, movieId]);

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session_id || !account_id) {
      alert('You need to authenticate first.');
      return;
    }

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/account/${account_id}/watchlist?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&session_id=${session_id}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            media_type: 'movie',
            media_id: movieId,
            watchlist: !added,
          }),
        }
      );

      const data = await res.json();
      if (data.success) {
        const newState = !added;
        setAdded(newState);
        fetchCount();

        // 🧠 لو حذفناه من الـ Watchlist، شغّل onRemove
        if (!newState && onRemove) {
          onRemove(movieId);
        }
      } else {
        console.error('Failed to toggle watchlist:', data);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div
      className="text-danger fs-4"
      role="button"
      onClick={handleToggle}
    >
      {loading ? '...' : added ? '❤️' : '♡'}
    </div>
  );
}
