import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        document.getElementById(hash.slice(1))?.scrollIntoView({
          behavior: 'smooth',
        })
        return
      }

      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    })

    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export default ScrollToTop