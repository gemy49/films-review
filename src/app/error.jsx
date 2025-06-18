'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({ error }) {
  const router = useRouter();
  useEffect(() => {
    console.error('unerexpected Error:', error);
  }, [error]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Unexpected Error</h2>
      <p style={styles.subtitle}>{error?.message || 'Please try again later'}</p>
      <button onClick={() => router.back()} className="btn text-center btn-warning mt-4 col-sm-8 col-md-5 col-lg-3 rounded-pill p-2 fs-5">
        Back To previous page
      </button>
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
    padding: '2rem',
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
