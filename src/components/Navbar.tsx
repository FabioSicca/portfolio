import { projects } from '../data/projects'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/#about">
          About
        </Link>
        <details className="projects-menu">
          <summary className="nav-link">Projects</summary>
          <div className="projects-dropdown">
            <Link to="/#projects">All projects</Link>
            {projects.map((project) => (
              <Link key={project.link} to={project.link}>
                {project.title}
              </Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  )
}

export default Navbar