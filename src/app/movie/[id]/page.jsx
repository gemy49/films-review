import RecommendedMovies from "@/app/componants/RecommendedMovies";
import StarRating from "@/app/componants/StarRating";
import WatchlistHeartButton from "@/app/componants/WatchlistButton";
import WatchlistButton from "@/app/componants/WatchlistButton";
import { faExternalLink, faLink, faLinkSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

async function getMovieCredits(id) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
  if (!res.ok) throw new Error('Failed to fetch credits');
  return res.json();
}
async function getMovieDetails(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json();
}
export default async function MovieDetailsPage({ params }) {
  const movie = await getMovieDetails(params.id);
  const credits = await getMovieCredits(params.id);
  const cast = credits.cast.slice(0, 12);

  return (
    <div className="container py-4">
      <div className="row mb-5">
        <div className="col-md-10 col-lg-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="img-fluid rounded"
            alt={movie.title}
          />
        </div>
        <div className="col-lg-8 py-4">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="mb-0">{movie.title}</h1>
            <WatchlistHeartButton movieId={movie.id} />

          </div>
          <p> {movie.release_date}</p>
          <StarRating rating={movie.vote_average} />
          <p> {movie.overview}</p>
          <div >
            {movie.genres.map((g) => (
              <div key={g.id}
                className="badge bg-warning text-dark p-2 m-2 rounded-pill">
                {g.name}
              </div>))
            }
          </div>
          <div className="my-4 d-flex justify-content-start align-items-center gap-2 flex-wrap">
            <p style={{marginRight: '20%'}}><strong>Duration:</strong> {movie.runtime} minutes</p>
            <p ><strong>language:</strong> {movie.original_language}</p>
          </div>
          <div className="d-flex justify-content-around align-items-center w-50">
            <strong style={{marginRight: '20%'}}>studio:</strong> 
          <div className="bg-white">
            <img
            src={`https://image.tmdb.org/t/p/w200${movie.production_companies[0].logo_path}`}
            alt={movie.production_companies[0].name}
            style={{ height: '30px', objectFit: 'contain' }}
          />
          </div>
            </div>
          <a className="btn  btn-outline-warning my-4 w-25 d-flex justify-content-center align-items-center " target="_blank" rel="noopener " href={`https://www.themoviedb.org/movie/${params.id}`}>
            <p className="m-1">Link</p>
            <FontAwesomeIcon className="mx-2" style={{ width: '15%' }} icon={faLink} /></a>
        </div>
      </div>

      <h3 className="mb-3">Main Cast</h3>
      <div className="row">
        {cast.map(actor => (
          <div className="col-6 col-sm-3 col-md-4 col-lg-2 mb-4 " key={actor.id}>
            <div className="card h-100 text-center">
              <img
                src={actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAMFBMVEXk5ueutLfb3t+nrrHn6eqrsbTh4+S7wMPT1tixt7rKztDBxsi3vL/q7O3Y293Q09Wdj+FKAAAFPklEQVR4nO2c25LbIAxADRZgrv7/vy042SabOyBH8g7npdP2xWckQBDQNA0Gg8FgMBgMBoPBYDAYDAaDwWAwGAwGg92BzKRlQevtL0cFQMvFOe/NhnduSfqQPtlk8SZYdY0Nxi86HswH4uKDFUrcUoR8OlJ4skoQD0zOPsKG5TDRick+E/kvZNMhdECb+Y1KsZmNZm8DsKp3YfkZPSv1x74BtP8gLGeYBwdS+NxlGzl8bT5OsUuqLRNXHVensuk4pmtOg0uGpQ24FpViQ/3l98Da6CLEyi00sNhmGcFsTgMZmgbMhrLM1hvf7lJWT+rP/8Vas1Y+sGE0CYDsictmwyfRwPTKqBCpJc7A0pdkW2i4zM+xW6VAbXEiuv7AlCKNRaIBgkrGUnsU4to7+s9wCA101DHXqEBtUqYyHBfBoeAEj+WiPLmM7qgwb2SCJHaBFWnIZCx1nkFXufwb5WldJt1dll3JGNo8gxTQXHKe0W45O3b+D1C0gwbajpeeyRDv0RDHf5kBNKWLRBz/ZQYg3XAmg+giRJCEMriTmaA9QYOEt/7Ty+CVzBtqIZXBHP9Fhs6l/LqEKjP/JRnayCCnGW1k/tSYwZ7NxjqDJoN2ArBhKcuZXGhiutDWZpP+S1sAzPOMsjmjlcHdaRJvm3t+Mb+Hss7M9PxkfkdIpC6ohwDE47/8bIbmUm440cpg1gCB/NoJoC2byhBnGWqe0f8OCBIrz2gLsxMRK88MvQvCxZkzxCvmiYhzEBg4uOTSGeWGBvm8fCJilDRsrjVNCLeaeMRlwtgIzPRrzIXOn2mUZROYTOqMDPV1ht90JRrxDvOOnpMN8ssMt0D77QYG1fIdrRto+vs/j2jbpjF93dRUcSrBoPB/CDTY8Llqfkt1lcakVH5M9E9fAd+jBP1FxpfA+nFwVGC2Vt4D8rPg5LBwHfpXwLSYt881lfJ8X2j+AvRi5lc6SpmF7yx2C+jk1ROf/O8+8StgXqNXc++j5jnQ/qLUCkzJ2zlT2meUP2d7lJHyEIhxksvqnFsXOcVDdGd4CfyH+ksa2b5cn5HnJjonzv95DPKn5u9PKSeX9yYEW6bibeGxIRjv3ZpSVpu4GxUPmYpEKPOWul87T1OBsiY7LUlyNdpE1hwL+2yB+S2VlXKcXJL8ki5CFjFBPAjGS6WT0MRolotRuq0rU4XHlVAeS3n5YXGiCVG70pWp69xMWOvpWwRBRLtzrqwj7a8VJyc+GO0f68yGbIuTt2GIJmedQNPzSL7es7Qyi0V/txgt9fAuKptOWL94xllUKg5h6lFh/dZGFKR724yt10aY9RuFAUwO98bsMx0vd19Howy7ZtiVjnX7LjsQ/d4ZdmUjwp7BAY38Kuutzn5nnrB8KcMuzH6fNQfAdVWTbahdLqFXtS7EtBH4z1BAftIdcxebeUVONXjftHRHHdxOezF9fehfgzoNxJUwLgWFZxNX0rig2sBCHBdEG9KxfwHlbn1X60JMEK4+fdZ9+SsgvOJGaV6Gguq9ko79RLYL1dehEiT5pHzN3DUJ9LdhxKXnJjdOtz9Eum7Z8oqL6GmDGJkl2UbjJQJIDF2UaQsN0lMSbJrmgIjaIAsN1fQAitu0/INtqGqQXy3j0dLUEfdxPCKq/m0qm8r/nvqdDW5/PFTq3w7g9pPApfbCfc4y6k9+Tm3rQFb7mFuq+wag9sbApvIwHbdxITZz1aBhPWRKq/qawLAsmC/UDRqMTv97UrfScNsv32BrZDgvmQVVJWNm3lR125HMqVs1gTdVLoPBYDAYDAZH4R8eaVEbhZaf7QAAAABJRU5ErkJggg=='}
                className="card-img-top"
                width="100%"
                height="100%"
                alt={actor.name}
              />
              <div className="card-body">
                <h6 className="card-title mb-1">{actor.name}</h6>
                <p className="card-text small text-muted">as {actor.character}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <RecommendedMovies movieId={movie.id} />

    </div>
  );
}
