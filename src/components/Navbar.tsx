import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { projects } from '../data/projects'

function Navbar() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash !== '#about') {
      return
    }

    requestAnimationFrame(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [location])

  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <Link className="nav-link" to="/">
          Home
        </Link>
        <Link className="nav-link" to="/about">
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