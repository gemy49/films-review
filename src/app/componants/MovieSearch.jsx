'use client';

import { useState, useEffect } from 'react';
import Card from './Card.jsx';
import Loading from '../loading.jsx';
import styles from '../page.module.css';
import Pagination from './Pagination.jsx';

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export default function MovieSearch() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchMovies = async (searchQuery = '', pageNumber = 1) => {
    setLoading(true);

    const endpoint = searchQuery
      ? `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchQuery}&page=${pageNumber}`
      : `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&page=${pageNumber}`;

    const res = await fetch(endpoint);
    const data = await res.json();

    setMovies(data.results || []);
    setTotalPages(data.total_pages || 1);
    setLoading(false);
  };

  // fetch on page or query change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchMovies(query, page);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, page]);

  // fetch default popular on mount
  useEffect(() => {
    fetchMovies('', 1);
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setPage(1); 
  };

  return (
    <div className="container py-4">
      <div className={`${styles.search} mb-4 p-4 rounded`}>
        <h1 className={styles.title}>Welcome to our Movie</h1>
        <p>Millions of movies, TV shows, and people to discover. Explore now.</p>
        <div className="mb-4 d-flex gap-2">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="form-control"
            value={query}
            onChange={handleSearchChange}
          />
          {query && (
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => setQuery('')}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <h3 className="mb-4">
        {query ? `Search results for "${query}"` : 'Now Playing'}
      </h3>

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="row">
            {movies.length > 0 ? (
              movies.map((movie) => <Card key={movie.id} movie={movie} />)
            ) : (
              <p>No results found.</p>
            )}
          </div>

          {movies.length > 0 && (
  <Pagination
    page={page}
    totalPages={totalPages}
    onPageChange={(newPage) => setPage(newPage)}
  />
)}
        </>
      )}
    </div>
  );
}
