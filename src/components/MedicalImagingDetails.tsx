import type { Project } from '../data/projects'

interface MedicalImagingDetailsProps {
  project: Project
}

function MedicalImagingDetails({ project }: MedicalImagingDetailsProps) {
  return (
    <>
      <header className="project-hero project-hero-medical">
        <p className="project-eyebrow">Machine learning platform</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </header>

      <section className="medical-pipeline" aria-label="Medical imaging pipeline">
        <div className="pipeline-step">
          <span>01</span>
          <strong>Image</strong>
          <small>Medical scan</small>
        </div>
        <span className="pipeline-line" aria-hidden="true" />
        <div className="pipeline-step">
          <span>02</span>
          <strong>Model</strong>
          <small>PyTorch + MONAI</small>
        </div>
        <span className="pipeline-line" aria-hidden="true" />
        <div className="pipeline-step">
          <span>03</span>
          <strong>API</strong>
          <small>FastAPI response</small>
        </div>
      </section>

      <div className="project-story-grid medical-story-grid">
        <section>
          <p className="project-section-label">The challenge</p>
          <h2>Turning complex images into an accessible workflow</h2>
          <p>{project.overview}</p>
        </section>
        <section>
          <p className="project-section-label">Stack</p>
          <div className="project-technologies">
            {project.technologies.map((technology) => (
              <span key={technology} className="project-technology">
                {technology}
              </span>
            ))}
          </div>
        </section>
      </div>

      <section className="project-highlights project-highlights-medical">
        <p className="project-section-label">Delivery focus</p>
        <ul>
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default MedicalImagingDetails