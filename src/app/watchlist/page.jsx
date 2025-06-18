'use client';

import { useEffect, useState } from 'react';
import { useWatchlist } from '../context/WatchlistContext.jsx';
import WatchlistCard from '../componants/WatchlistCard';
import NoData from '../componants/NoData.jsx';
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
        fetchCount(); 
      } catch (err) {
        console.error('Error fetching watchlist:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [sessionId, accountId]);

  if (loading) return <NoData loading={true}/>;

 return (
  <div className="container py-4">
    <h1 className="mb-4 fw-bold">🎬 Your Watchlist</h1>
    <div className="row d-flex justify-content-center ">
      {watchlist.length > 0 ? (
        watchlist.map((movie) => (
          <WatchlistCard
            key={movie.id}
            movie={movie}
            onRemove={(id) => {
              setWatchlist((prev) => prev.filter((m) => m.id !== id));
              fetchCount();
            }}
          />
        ))
      ) : (
        <NoData loading={false} />
      )}
    </div>
  </div>
);

}
