import type { Project } from '../data/projects'

interface MiniDynamodbDetailsProps {
  project: Project
}

function MiniDynamodbDetails({ project }: MiniDynamodbDetailsProps) {
  return (
    <>
      <header className="project-hero project-hero-database">
        <p className="project-eyebrow">Distributed systems study</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </header>

      <section className="database-map" aria-label="Cluster architecture">
        <div className="database-map-label">Request flow</div>
        <div className="database-node database-client">Client</div>
        <span className="database-arrow" aria-hidden="true">→</span>
        <div className="database-node database-coordinator">ZooKeeper</div>
        <span className="database-arrow" aria-hidden="true">→</span>
        <div className="database-nodes">
          <div className="database-node">Node A</div>
          <div className="database-node">Node B</div>
          <div className="database-node">Node C</div>
        </div>
      </section>

      <div className="project-story-grid">
        <section>
          <p className="project-section-label">The idea</p>
          <h2>A small database with big system concerns</h2>
          <p>{project.overview}</p>
        </section>
        <section>
          <p className="project-section-label">Technology</p>
          <div className="project-technologies">
            {project.technologies.map((technology) => (
              <span key={technology} className="project-technology">
                {technology}
              </span>
            ))}
          </div>
        </section>
      </div>

      <section className="project-highlights project-highlights-database">
        <p className="project-section-label">What I explored</p>
        <ul>
          {project.highlights.map((highlight, index) => (
            <li key={highlight}>
              <span aria-hidden="true">0{index + 1}</span>
              {highlight}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default MiniDynamodbDetails