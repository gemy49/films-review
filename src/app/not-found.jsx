import Link from "next/link";

export default function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.subtitle}>  Page Not Found </p>
      <p style={styles.description}>
        Sorry, the page you are looking for does not exist. Please check the URL or try again later.
      </p>
      <Link href="/" className="btn text-center btn-warning mt-4 col-sm-8 col-md-5 col-lg-3 rounded-pill p-2 fs-5">Back To Home</Link>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    color: '#333',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '6rem',
    margin: 0,
  },
  subtitle: {
    fontSize: '2rem',
    margin: '0.5rem 0',
  },
  description: {
    maxWidth: '400px',
    marginBottom: '2rem',
    lineHeight: 1.6,
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0070f3',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
};
