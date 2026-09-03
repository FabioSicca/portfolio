function About() {
  return (
    <main id="about" className="about-page">
      <header className="about-page-header">
        <p className="about-label">About me</p>
        <h1>Software engineer focused on dependable systems.</h1>
        <p>
          I enjoy building backend software that is clear to understand,
          reliable in production and ready to evolve as its requirements grow.
        </p>
      </header>

      <section className="about-story" aria-labelledby="about-story-title">
        <div>
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
        <div className="about-fact">
          <span>Location</span>
          <strong>Your city, country</strong>
          <small>Replace this with your current location.</small>
        </div>
        <div className="about-fact">
          <span>Education</span>
          <strong>Your degree or institution</strong>
          <small>Add your studies, degree or relevant training.</small>
        </div>
        <div className="about-fact">
          <span>Focus</span>
          <strong>Backend engineering</strong>
          <small>APIs, services and distributed systems.</small>
        </div>
      </section>

      <section className="about-toolkit" aria-labelledby="toolkit-title">
        <div>
          <p className="about-label">Toolkit</p>
          <h2 id="toolkit-title">Technologies I enjoy working with.</h2>
        </div>
        <ul>
          {['Go', 'Python', 'FastAPI', 'PyTorch', 'gRPC', 'Raft', 'ZooKeeper', 'Docker'].map(
            (technology) => (
              <li key={technology}>{technology}</li>
            ),
          )}
        </ul>
      </section>
    </main>
  )
}

export default About