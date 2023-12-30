import { useEffect, useRef, useState } from 'react'

const useElementWidth = () => {
  const [width, setWidth] = useState(0)
  const elementRef = useRef<HTMLElement | null>(null)

  const updateWidth = () => {
    if (elementRef.current) {
      const currentWidth = elementRef.current.clientWidth
      setWidth(currentWidth)
    }
  }

  useEffect(() => {
    const resizeObserverSupported = typeof ResizeObserver !== 'undefined'

    const handleResize = () => {
      updateWidth()
    }

    if (resizeObserverSupported) {
      const resizeObserver = new ResizeObserver(handleResize)
      if (elementRef.current) {
        resizeObserver.observe(elementRef.current)
      }
      return () => {
        if (elementRef.current) {
          resizeObserver.unobserve(elementRef.current)
        }
      }
    } else {
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  useEffect(() => {
    updateWidth()
  }, [elementRef])

  return { width, elementRef }
}

export default useElementWidth
