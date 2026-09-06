import type { Project } from '../data/projects'
import MVPStructure from '../assets/MVP-structure.png'
import ImageContainer from './ImageContainer'

interface MedicalImagingDetailsProps {
  project: Project
}

function MedicalImagingDetails({ project }: MedicalImagingDetailsProps) {
  return (
    <article className="project-details">
      <header className="project-hero project-hero-medical">
        <p className="project-eyebrow">Machine Learning Platform</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </header>

      {/* PIPELINE OVERVIEW */}
      <section className="medical-pipeline" aria-label="Medical imaging pipeline">
        <div className="pipeline-step">
          <span>01</span>
          <strong>Raw Input</strong>
          <small>DICOM / NIfTI Conversion</small>
        </div>
        <span className="pipeline-line" aria-hidden="true" />
        <div className="pipeline-step">
          <span>02</span>
          <strong>Deep Learning</strong>
          <small>PyTorch + MONAI</small>
        </div>
        <span className="pipeline-line" aria-hidden="true" />
        <div className="pipeline-step">
          <span>03</span>
          <strong>Inference</strong>
          <small>Segmentation & Classification</small>
        </div>
      </section>

      <div className="project-story-grid medical-story-grid">
        
        {/* THE CHALLENGE */}
        <section className="project-problem">
          <p className="project-section-label">The Challenge</p>
          <h2>Silent progression and restricted access to specialized care</h2>
          <p>
            Neurological diseases are notoriously difficult to detect in their early stages due to subtle or nonexistent symptoms. By the time detection occurs, treatments are often less effective due to irreversible progression. 
          </p>
          <p>
            Early diagnosis drastically improves the viability of minimally invasive, personalized treatments. However, patients often face significant bottlenecks: long wait times, geographical distance from specialized institutes, and the complex nature of analyzing raw MRI scans.
          </p>
        </section>

        {/* THE SOLUTION & ARCHITECTURE */}
        <section className="project-architecture">
          <p className="project-section-label">System Architecture</p>
          <h2>Scalable microservices for heavy deep learning workloads</h2>
          <p>
            To serve these models reliably to medical professionals, the platform uses a decoupled microservices architecture designed to handle intensive Python-based image processing without bottlenecking the user experience.
          </p>
          <ul className="architecture-list">
            <li>
              <strong>API Gateway:</strong> Orchestrates complex requests across multiple services and acts as the secure, single point of entry.
            </li>
            <li>
              <strong>User Service:</strong> Handles authentication and manages both user and patient profiles.
            </li>
            <li>
              <strong>Image Processing Service:</strong> Manages the inference pipeline for Stroke, Metastasis, and Alzheimer's models, persisting results for medical review.
            </li>
            <li>
              <strong>Dedicated Aneurysm Service:</strong> Isolated due to its exceptionally high computational resource requirements, ensuring the main application remains responsive during complex classification tasks.
            </li>
          </ul>
        </section>
      </div>

      <ImageContainer caption="MVP microservices architecture diagram">
        <img
          src={MVPStructure}
          alt="MVP microservices architecture diagram showing API Gateway, User Service, Image Processing Service, and Aneurysm Service"
        />
      </ImageContainer>

      {/* MODELS SECTION */}
      <section className="project-models">
        <p className="project-section-label">Deep Learning Models</p>
        <h2>Targeted inference for neurological conditions</h2>
        <div className="models-grid">
          
          <div className="model-card">
            <h3>Metastasis</h3>
            <span className="model-badge">Segmentation</span>
            <p>Analyzes raw NIfTI files to identify and isolate the specific area of metastatic lesions, outputting precise spatial boundaries.</p>
          </div>

          <div className="model-card">
            <h3>Stroke (ACV)</h3>
            <span className="model-badge">Segmentation</span>
            <p>Maps the affected brain regions post-stroke to assist in evaluating tissue damage and treatment viability.</p>
          </div>

          <div className="model-card">
            <h3>Aneurysm</h3>
            <span className="model-badge">Classification</span>
            <p>High-resource model that evaluates scans to determine the presence and probability of aneurysms.</p>
          </div>

          <div className="model-card">
            <h3>Alzheimer's</h3>
            <span className="model-badge">Classification</span>
            <p>Assesses neurological imaging to classify the presence or progression markers of Alzheimer's disease.</p>
          </div>

        </div>
      </section>

      {/* TECH STACK */}
      <section className="project-stack">
        <p className="project-section-label">Core Technologies</p>
        <div className="project-technologies">
          <span className="project-technology">
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#python-icon" />
            </svg>
            Python
          </span>
          <span className="project-technology">
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#pytorch-icon" />
            </svg>
            PyTorch
          </span>
          <span className="project-technology">
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#monai-icon" />
            </svg>
            MONAI
          </span>
          <span className="project-technology">
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#tensorflow-icon" />
            </svg>
            TensorFlow
          </span>
          <span className="project-technology">
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#fastapi-icon" />
            </svg>
            FastAPI
          </span>
          <span className="project-technology">
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#docker-icon" />
            </svg>
            Docker
          </span>
          <span className="project-technology">
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#minio-icon" />
            </svg>
            MinIO
          </span>
          <span className="project-technology">
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#mongodb-icon" />
            </svg>
            MongoDB
          </span>
          <span className="project-technology">
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#google-colab-icon" />
            </svg>
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#kaggle-icon" />
            </svg>
            Google Colab/Kaggle
          </span>
          <span className="project-technology">
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#pandas-icon" />
            </svg>
            Pandas
          </span>
          <span className="project-technology">
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#react-icon" />
            </svg>
            React
          </span>
          <span className="project-technology">
            <svg className="technology-icon" aria-hidden="true">
              <use href="/icons.svg#css-icon" />
            </svg>
            CSS
          </span>

        </div>
      </section>
    </article>
  )
}

export default MedicalImagingDetails