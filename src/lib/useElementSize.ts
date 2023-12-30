import { useEffect, useRef, useState } from 'react'

const useElementSize = () => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const elementRef = useRef<HTMLElement | null>(null)

  const updateWidth = () => {
    if (elementRef.current) {
      const currentWidth = elementRef.current.clientWidth
      setWidth(currentWidth)
    }
  }

  const updateHeight = () => {
    if (elementRef.current) {
      const currentHeight = elementRef.current.clientHeight
      setHeight(currentHeight)
    }
  }

  useEffect(() => {
    const resizeObserverSupported = typeof ResizeObserver !== 'undefined'

    const handleResize = () => {
      updateWidth()
      updateHeight()
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
    updateHeight()
  }, [elementRef])

  return { width, height, elementRef }
}

export default useElementSize
