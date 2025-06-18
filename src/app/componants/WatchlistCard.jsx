import Link from 'next/link';
import { useState } from 'react';
import WatchlistHeartButton from './WatchlistButton';

export default function WatchlistCard({ movie, onRemove }) {
  return (
    <div className="card mb-4 col-md-12 col-lg-5 mx-4 shadow-sm rounded d-flex flex-row position-relative" key={movie.id}>
      <div className="position-absolute top-0 end-0 m-2 z-3">
        <WatchlistHeartButton movieId={movie.id} onRemove={onRemove} />

      </div>

      <Link
        href={`/movie/${movie.id}`}
        className="text-decoration-none text-dark d-flex flex-row w-100"
      >
        <div className="col-auto py-1 rounded" style={{ width: '30%' }}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="img-fluid rounded-start"
            alt={movie.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="card-body d-flex flex-column justify-content-between h-100">
          <div>
            <h5 className="card-title fw-bold mb-2">{movie.title}</h5>
            <p className="card-text text-muted" style={{ maxHeight: '90px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {movie.overview || 'No overview available.'}
            </p>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">
              Release: {new Date(movie.release_date).toLocaleDateString()}
            </small>
            <span className="badge bg-primary">
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
