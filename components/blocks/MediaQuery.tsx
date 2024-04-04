import { useMediaQuery } from '@hooks/useMediaQuery'

export default function MediaQueryShowcase() {
  const isSmallScreen = useMediaQuery('(max-width: 767px)')
  const isMediumScreen = useMediaQuery(
    '(min-width: 768px) and (max-width: 1023px)',
  )
  const isLargeScreen = useMediaQuery('(min-width: 1024px)')

  return (
    <>
      <div className="grid gap-3 p-4 border rounded-lg">
        <h2
          id="useMediaQuery"
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          useMediaQuery
        </h2>
        <div>
          {isSmallScreen && <p>You are on a small screen.</p>}
          {isMediumScreen && <p>You are on a medium screen.</p>}
          {isLargeScreen && <p>You are on a large screen.</p>}
        </div>
      </div>
    </>
  )
}
