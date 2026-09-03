import type { Project } from '../data/projects'
import { Link } from 'react-router-dom'
import MedicalImagingDetails from './MedicalImagingDetails'
import MiniDynamodbDetails from './MiniDynamodbDetails'

interface ProjectDetailsProps {
  project: Project
}

function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <main className="project-details">
      <Link className="back-link" to="/">
        ← Back to portfolio
      </Link>
      {project.link.endsWith('mini-dynamodb') ? (
        <MiniDynamodbDetails project={project} />
      ) : (
        <MedicalImagingDetails project={project} />
      )}
    </main>
  )
}

export default ProjectDetails