'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({ error }) {
  const router = useRouter();
  useEffect(() => {
    console.error('unerexpected Error:', error);
  }, [error]);

  return (
         <div className="container vh-100 d-flex align-items-center justify-content-center">
  <div className="row text-center">
    <h2 className="mb-3" style={styles.title}>Unexpected Error</h2>
    <p className="mb-4" style={styles.subtitle}>Something went wrong. Please try again later</p>
    <button
      onClick={() => router.back()}
      className="btn btn-warning col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 rounded-pill fs-5"
    >
      Back To previous page
    </button>
  </div>
</div>

  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    color: '#721c24',
    textAlign: 'center',
  },
  title: { fontSize: '2.5rem', marginBottom: '1rem' },
  subtitle: { fontSize: '1.2rem', marginBottom: '2rem' },
  button: {
    backgroundColor: '#721c24',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};
