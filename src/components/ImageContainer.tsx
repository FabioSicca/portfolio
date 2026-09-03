import type { ReactNode } from 'react'

interface ImageContainerProps {
  children: ReactNode
  caption?: string
  className?: string
}

function ImageContainer({ children, caption, className = '' }: ImageContainerProps) {
  return (
    <figure className={`image-container ${className}`.trim()}>
      <div className="image-container-content">{children}</div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

export default ImageContainer
