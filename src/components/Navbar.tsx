import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'

function Navbar() {
  const [projectsOpen, setProjectsOpen] = useState(false)

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setProjectsOpen(false)
      }
    }

    document.addEventListener('keydown', closeWithEscape)
    return () => document.removeEventListener('keydown', closeWithEscape)
  }, [])

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/about">
          About
        </Link>
        <div
          className="projects-menu"
          onMouseEnter={() => setProjectsOpen(true)}
          onMouseLeave={() => setProjectsOpen(false)}
        >
          <button
            type="button"
            className="nav-link projects-trigger"
            aria-expanded={projectsOpen}
            aria-haspopup="menu"
            onClick={() => setProjectsOpen((open) => !open)}
          >
            Projects
          </button>
          {projectsOpen && <div className="projects-dropdown" role="menu">
            <Link to="/#projects">All projects</Link>
            {projects.map((project) => (
              <Link key={project.link} to={project.link}>
                {project.title}
              </Link>
            ))}
          </div>}
        </div>
      </nav>
    </header>
  )
}

export default Navbar