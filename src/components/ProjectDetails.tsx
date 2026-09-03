import type { Project } from '../data/projects'
import MedicalImagingDetails from './MedicalImagingDetails'
import MiniDynamodbDetails from './MiniDynamodbDetails'

interface ProjectDetailsProps {
  project: Project
}

function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <main className="project-details">
      <a className="back-link" href="/">
        ← Back to portfolio
      </a>
      {project.link.endsWith('mini-dynamodb') ? (
        <MiniDynamodbDetails project={project} />
      ) : (
        <MedicalImagingDetails project={project} />
      )}
    </main>
  )
}

export default ProjectDetails