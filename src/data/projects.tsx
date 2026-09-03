export type Project = {
  title: string
  description: string
  technologies: string[]
  link: string
  direction: 'left' | 'right'
}

export const projects: Project[] = [
  {
    title: 'Mini-DynamoDB',
    description:
      'Distributed key-value store implementing sharding, Raft replication, ZooKeeper coordination and configurable consistency.',
    technologies: ['Go', 'Raft', 'gRPC', 'ZooKeeper'],
    link: '/projects/mini-dynamodb',
    direction: 'left',
  },
  {
    title: 'Medical Imaging Diagnosis Platform',
    description:
      'Platform for medical image analysis using deep learning models for Alzheimer’s disease classification.',
    technologies: ['Python', 'PyTorch', 'MONAI', 'FastAPI', 'Docker'],
    link: '/projects/medical-imaging',
    direction: 'right',
  },
]