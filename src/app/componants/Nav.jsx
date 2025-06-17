'use client';
import Link from 'next/link';
import { useWatchlist } from '../context/WatchlistContext';
import Styles from '../page.module.css';
export default function Nav() {
  const { count } = useWatchlist();

  return (
    <nav className="navbar bg-warning ">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand fs-4 fw-bold">
            Movie App
          </Link>
        <div className="d-flex mx-4 position-relative">
          <h5 className="me-2 mb-0">❤️</h5>
          <Link href="/watchlist" className="text-dark me-4 ">
            Watchlist
            <div className={`${Styles.count}`} >
              {count}
            </div>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}
