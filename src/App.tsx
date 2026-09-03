import { useEffect, useState } from 'react'
import MyImg from './assets/profile-image.png'
import './App.css'
import ThemeToggle from './components/ThemeToggle'
import Projects from './components/Projects'

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
      <ThemeToggle
        theme={theme}
        onToggle={() =>
          setTheme((currentTheme) =>
            currentTheme === 'dark' ? 'light' : 'dark'
          )
        }
      />

      <section id="center">
        <div className="hero">
          <img src={MyImg} className="base" width="170" height="170" alt="" />
        </div>
        <div>
          <h1>Fabio Sicca</h1>
          <p className="text-justify">
            Hi, I'm Fabio Sicca, a passionate Backend Developer with a strong focus on creating efficient and scalable solutions. I specialize in building robust backend systems, APIs, and services that power modern applications. With a keen eye for detail and a commitment to best practices, I strive to deliver high-quality code that meets the needs of both users and businesses.
          </p>
        </div>
        <ul className="social-links">
          <li>
            <a href="https://github.com/FabioSicca" target="_blank">
              <svg
                className="button-icon"
                role="presentation"
                aria-hidden="true"
              >
                <use href="/icons.svg#github-icon"></use>
              </svg>
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/fabio-sicca/" target="_blank">
              <svg
                className="button-icon"
                role="presentation"
                aria-hidden="true"
              >
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

export default App
