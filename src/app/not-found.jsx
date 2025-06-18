import Link from "next/link";

export default function NotFound() {
  return (
      <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row text-center">
        <h2 className="mb-3" style={styles.title}>404</h2>
        <p className="mb-3" style={styles.subtitle}>Page Not Found</p>
        <p className="mb-4">
          Sorry, the page you are looking for does not exist. Please check the URL or try again later.
        </p>
        <Link
          href="/"
          className="btn btn-warning col-10 offset-1 col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-lg-4 offset-lg-4 rounded-pill fs-5"
        >
          Back To Home
        </Link>
      </div>
    </div>
  );
}

const styles = {
 
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
