import { useEffect, useState } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import MyImg from './assets/profile-image.png'
import profileAnimation from './assets/profile-animation.png'
import './App.css'
import ThemeToggle from './components/ThemeToggle'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import About from './components/About'
import ProjectDetails from './components/ProjectDetails'
import { projects } from './data/projects'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <>
      <Navbar />
      <ThemeToggle
        theme={theme}
        onToggle={() =>
          setTheme((currentTheme) =>
            currentTheme === 'dark' ? 'light' : 'dark'
          )
        }
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

function HomePage() {
  return (
    <>
      <section id="center">
        <div className="profile-layout">
          <div className="profile-info">
            <div className="Image-container">
              <img src={MyImg} className="base" width="170" height="170" alt="" />
            </div>
            <div>
              <h1>Fabio Sicca</h1>
              <h2>Software Engineer</h2>
              <p className="text-justify">
                Hi, I'm Fabio Sicca, a passionate Backend Developer with a strong focus on creating efficient and scalable solutions. I specialize in building robust backend systems, APIs, and services that power modern applications. With a keen eye for detail and a commitment to best practices, I strive to deliver high-quality code that meets the needs of both users and businesses.
              </p>
            </div>
          </div>
          <img className="profile-animation" src={profileAnimation} alt="" />
        </div>
        <ul className="social-links">
          <li>
            <a href="https://github.com/FabioSicca" target="_blank" rel="noreferrer">
              <svg className="button-icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#github-icon"></use>
              </svg>
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/fabio-sicca/" target="_blank" rel="noreferrer">
              <svg className="button-icon linkedin-icon" role="presentation" aria-hidden="true">
                <use href="/icons.svg#linkedin-icon"></use>
              </svg>
              LinkedIn
            </a>
          </li>
        </ul>
      </section>
      <Projects />
    </>
  )
}


function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((candidate) => candidate.link === `/projects/${slug}`)

  return project ? <ProjectDetails project={project} /> : <NotFoundPage />
}

function NotFoundPage() {
  return (
    <main className="project-details">
      <h1>Page not found</h1>
      <p>The page you requested does not exist.</p>
    </main>
  )
}

export default App
