import { projects } from '../data/projects'

function Navbar() {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="nav-link" href="/">
          Home
        </a>
        <a className="nav-link" href="/#about">
          About
        </a>
        <details className="projects-menu">
          <summary className="nav-link">Projects</summary>
          <div className="projects-dropdown">
            <a href="/#projects">All projects</a>
            {projects.map((project) => (
              <a key={project.link} href={project.link}>
                {project.title}
              </a>
            ))}
          </div>
        </details>
      </nav>
    </header>
  )
}

export default Navbar