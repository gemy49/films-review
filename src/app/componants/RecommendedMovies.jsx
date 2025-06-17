"use client"
import   { useEffect, useState } from 'react';
import Card from './Card'; 

export default function RecommendedMovies({ movieId }) {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const fetchRecommended = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const data = await res.json();
      setRecommended(data.results || []);
    };

    if (movieId) fetchRecommended();
  }, [movieId]);

  return (
    <div className="mt-5">
      <h4 className="mb-4">🎯 Recommended Movies</h4>
      <div className="row">
        {recommended.length > 0 ? (
          recommended.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))
        ) : (
          <p>No recommendations available.</p>
        )}
      </div>
    </div>
  );
}
