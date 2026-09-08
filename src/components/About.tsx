import { Link } from 'react-router-dom'

type TechItemProps = {
  icon: string
  extraIcon?: string
  children: string
}

function TechItem({ icon, extraIcon, children }: TechItemProps) {
  return (
    <li className="project-technology">
      <svg className="technology-icon" aria-hidden="true">
        <use href={`/icons.svg#${icon}`} />
      </svg>
      {extraIcon ? (
        <svg className="technology-icon" aria-hidden="true">
          <use href={`/icons.svg#${extraIcon}`} />
        </svg>
      ) : null}
      {children}
    </li>
  )
}

function About() {
  return (
    <main id="about" className="about-page">
      <header className="about-page-header">
        <p className="about-label">About me</p>
        <h1>Software engineer</h1>
        <p className="about-lead">
          I enjoy building backend software that is clear to understand,
          reliable in production and ready to evolve as its requirements grow.
        </p>
      </header>

      <section className="about-story" aria-labelledby="about-story-title">
        <div className="about-story-heading">
          <p className="about-label">A little more about me</p>
          <h2 id="about-story-title">Curiosity, structure and practical engineering.</h2>
        </div>
        <div className="about-copy">
          <p>
            I'm a backend-focused software engineer with a strong interest in
            APIs, distributed systems and data-intensive applications. I like
            understanding the problem deeply before choosing a solution.
          </p>
          <p>
            My goal is to create software that balances solid technical
            foundations with a simple experience for the people who use it.
          </p>
        </div>
      </section>

      <section className="about-details" aria-label="Personal and professional details">
        <article className="about-fact">
          <span>Location</span>
          <strong>CABA, Buenos Aires, Argentina</strong>
        </article>
        <article className="about-fact">
          <span>Education</span>
          <strong>Software Engineering at Universidad de Buenos Aires</strong>
        </article>
        <article className="about-fact">
          <span>Focus</span>
          <strong>Backend engineering</strong>
          <small>APIs, services and data processing.</small>
        </article>
      </section>

      <section className="about-toolkit" aria-labelledby="toolkit-title">
        <p className="about-label">Toolkit</p>
        <h2 id="toolkit-title">Technologies I enjoy working with.</h2>

        <div className="about-toolkit-groups">
          <div className="about-toolkit-group">
            <p className="project-section-label">Backend</p>
            <ul className="project-technologies">
              <TechItem icon="python-icon">Python</TechItem>
              <TechItem icon="fastapi-icon">FastAPI</TechItem>
              <TechItem icon="docker-icon">Docker</TechItem>
              <TechItem icon="minio-icon">MinIO</TechItem>
              <TechItem icon="mongodb-icon">MongoDB</TechItem>
            </ul>
          </div>

          <div className="about-toolkit-group">
            <p className="project-section-label">Machine learning &amp; data</p>
            <ul className="project-technologies">
              <TechItem icon="pytorch-icon">PyTorch</TechItem>
              <TechItem icon="monai-icon">MONAI</TechItem>
              <TechItem icon="tensorflow-icon">TensorFlow</TechItem>
              <TechItem icon="pandas-icon">Pandas</TechItem>
              <TechItem icon="google-colab-icon" extraIcon="kaggle-icon">
                Google Colab/Kaggle
              </TechItem>
            </ul>
          </div>

          <div className="about-toolkit-group">
            <p className="project-section-label">Frontend</p>
            <ul className="project-technologies">
              <TechItem icon="react-icon">React</TechItem>
              <TechItem icon="css-icon">CSS</TechItem>
            </ul>
          </div>
        </div>
      </section>

      <section className="about-cta" aria-label="See selected work">
        <div>
          <p className="about-label">Selected work</p>
          <h2>See how this translates into projects.</h2>
        </div>
        <Link className="about-cta-link" to="/#projects">
          View projects
        </Link>
      </section>
    </main>
  )
}

export default About
