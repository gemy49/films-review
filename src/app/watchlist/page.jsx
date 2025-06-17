'use client';

import { useEffect, useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext.jsx';
import WatchlistCard from '../componants/WatchlistCard';
import Loading from '../loading';
import Link from 'next/link.js';

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchCount } = useWatchlist();

  const sessionId = typeof window !== 'undefined' && localStorage.getItem('session_id');
  const accountId = typeof window !== 'undefined' && localStorage.getItem('account_id');

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!sessionId || !accountId) return;

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&session_id=${sessionId}`
        );
        const data = await res.json();
        setWatchlist(data.results || []);
        fetchCount(); // ⬅️ تحديث العداد من السياق
      } catch (err) {
        console.error('Error fetching watchlist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [sessionId, accountId]);

  if (loading) return <Loading />;

  return (
    <div className="container py-4">
      <h1 className="mb-4 fw-bold">🎬 Your Watchlist</h1>
      <div className="row">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <WatchlistCard
              key={movie.id}
              movie={movie}
              onRemove={(id) => {
                setWatchlist((prev) => prev.filter((m) => m.id !== id));
                fetchCount(); // ⬅️ تحديث العداد عند الحذف
              }}
            />
          ))
        ) : (
          <div className="flexbox justify-center align-center text-center">
            <h1 style={{ fontSize: '12rem' }}>💔</h1>
            <h2>No movies in your watchlist</h2>
            <Link href={"/"} className="btn text-center btn-warning mt-4 w-25 rounded-pill p-2 fs-5">Go To Add Movies</Link >
          </div>
        )}
      </div>
    </div>
  );
}
