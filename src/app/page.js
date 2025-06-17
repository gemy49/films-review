import React from 'react';
import MovieSearch from './componants/MovieSearch';
import TMDBSessionHandler from './componants/TMDBSessionHandler';

export default function Home() {
  return (
    <>
      <TMDBSessionHandler />
      <MovieSearch />
    </>
  );
}
