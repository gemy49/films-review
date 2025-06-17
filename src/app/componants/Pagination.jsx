'use client';

import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages = [];

    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <nav aria-label="Movie pagination text-center " className="mt-4">
      <ul className="pagination justify-content-around w-50 mx-auto">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link bg-transparent text-secondary"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
              onPageChange(page - 1)
            }
            }
            disabled={page === 1}
          >
           <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        </li>

        {generatePages().map((pg) => (
          <li
            key={pg}
            className={`page-item  ${pg === page ? 'bg-warning' : ''}`}
          >
            <button
              className="page-link bg-transparent text-secondary"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' }); 
                onPageChange(pg)
              }
            }
            >
              {pg}
            </button>
          </li>
        ))}

        <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link bg-transparent text-secondary"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' }); 
              onPageChange(page + 1)}}
            disabled={page === totalPages}
          >
           <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
