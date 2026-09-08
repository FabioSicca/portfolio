import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-identity">
          <strong>Fabio Sicca</strong>
          <span>Backend-focused software engineer.</span>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/#projects">Projects</Link>
        </nav>

        <div className="footer-socials">
          <a
            href="https://github.com/FabioSicca"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/fabio-sicca/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Fabio Sicca</span>
        <span>Built with React, TypeScript and Vite.</span>
      </div>
    </footer>
  )
}

export default Footer