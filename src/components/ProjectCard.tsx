import { useEffect, useRef } from 'react'
import type { Project } from '../data/projects'

interface ProjectCardProps {
  project: Project
}

function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const card = cardRef.current

    if (!card) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          card.classList.add('visible')
          observer.unobserve(card)
        }
      },
      {
        threshold: 0.40,
      },
    )

    observer.observe(card)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <article
      ref={cardRef}
      className={`project-card ${project.direction}`}
    >
      <div className="project-card-content">
        <h2>{project.title}</h2>

        <p>{project.description}</p>

        <div className="project-technologies">
          {project.technologies.map((technology) => (
            <span key={technology} className="project-technology">
              {technology}
            </span>
          ))}
        </div>

        <a href={project.link} className="project-link">
          View project →
        </a>
      </div>
      {project.image && (
        <div className="project-card-media">
          <img src={project.image} alt={`${project.title} preview`} />
        </div>
      )}
    </article>
  )
}

export default ProjectCard