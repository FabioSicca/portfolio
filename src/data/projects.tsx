import dynamodbImage from '../assets/dynamodb.jpeg'
import brainImage from '../assets/brain.jpg'

export type Project = {
  title: string
  description: string
  overview: string
  highlights: string[]
  technologies: string[]
  link: string
  direction: 'left' | 'right'
  image?: string
}

export const projects: Project[] = [
  {
    title: 'Mini-DynamoDB',
    description:
      'Distributed key-value store implementing sharding, Raft replication, ZooKeeper coordination and configurable consistency.',
    overview:
      'Mini-DynamoDB is a distributed key-value store designed to explore the systems behind highly available databases. The project splits data across nodes, replicates it with Raft and uses ZooKeeper to coordinate the cluster.',
    highlights: [
      'Sharded data across multiple nodes for horizontal scalability.',
      'Used Raft replication to keep cluster state consistent.',
      'Supported configurable consistency for different client needs.',
    ],
    technologies: ['Go', 'Raft', 'gRPC', 'ZooKeeper'],
    link: '/projects/mini-dynamodb',
    direction: 'left',
    image: dynamodbImage,
  },
  {
    title: 'Medical Imaging Diagnosis Platform',
    description:
      'Platform for medical image analysis using deep learning models for disease segmentation and classification.',
    overview:
      'This platform provides a service for analyzing medical images with deep learning models. It combines a Python inference pipeline with an API designed to make model predictions accessible to other applications.',
    highlights: [
      'Prepared medical imaging data for model training and inference.',
      'Built an API with FastAPI to expose the diagnosis workflow.',
      'Containerized the platform with Docker for reproducible deployments.',
    ],
    technologies: ['Python', 'PyTorch', 'MONAI', 'FastAPI', 'Docker'],
    link: '/projects/medical-imaging',
    direction: 'right',
    image: brainImage,
  },
]