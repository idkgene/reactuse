import { useRef, useEffect } from 'react'

/**
 * useRenderInfo is a custom React hook that provides information about the rendering of a component.
 * It tracks the number of renders, time elapsed since the last render, and the timestamp of the current render.
 *
 * @param {string} name - The name of the component for which render information is being tracked.
 * @returns {Object} An object containing the render information.
 * @property {string} name - The name of the component.
 * @property {number} renders - The number of times the component has rendered.
 * @property {number} sinceLastRender - The time elapsed in milliseconds since the last render.
 * @property {number} timestamp - The timestamp of the current render.
 */
function useRenderInfo(name: string): {
  name: string
  renders: number
  sinceLastRender: number
  timestamp: number
} {
  const renderInfo = useRef({
    name,
    renders: 0,
    sinceLastRender: 0,
    timestamp: 0,
  })

  useEffect(() => {
    const now = Date.now()
    renderInfo.current.renders++
    renderInfo.current.sinceLastRender = now - renderInfo.current.timestamp
    renderInfo.current.timestamp = now
  })

  return renderInfo.current
}

export default useRenderInfo
