const API_BASE = 'https://api.themoviedb.org/3';

export async function fetchPopularMovies() {
  const res = await fetch(
    `${API_BASE}/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
  );
  if (!res.ok) throw new Error('Failed to fetch popular movies');
  return res.json();
}
