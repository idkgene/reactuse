'use client'
import { GithubIcon, SquareTerminal, Triangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useEffectOnce } from '@hooks/useEffectOnce'
import { useFirstMountState } from '@hooks/useFirstMountState'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { useIsClient } from '@hooks/useIsClient'
import { useIsTouchDevice } from '@hooks/useIsTouchDevice'
import { useIsVisible } from '@hooks/useIsVisible'
import useKeySequence from '@hooks/useKeySequence'
import { useOrientation } from '@hooks/useOrientation'
import { usePageLeave } from '@hooks/usePageLeave'
import { useRect } from '@hooks/useRect'
import useThrottle from '@hooks/useThrottle'
import useWindowLoad from '@hooks/useWindowLoad'
import useWindowResize from '@hooks/useWindowResize'
import Alert from '@ui-components/alert'
import { Input } from '@ui-components/input'
import ClipboardShowcase from '@ui-showcase/Clipboard'
import DebounceShowcase from '@ui-showcase/Debounce'
import DebugShowcase from '@ui-showcase/Debug'
import DocumentReadyShowCase from '@ui-showcase/DocumentReady'
import HoverShowase from '@ui-showcase/Hover'
import MousePositionShowcase from '@ui-showcase/MousePosition'
import { useEffect, useRef, useState } from 'react'
import ClientShowcase from '../components/blocks/Client'
import DocumentTitleShowcase from '../components/blocks/DocumentTitle'
import IOSToolbarStateShowcase from '../components/blocks/IOSToolbarState'
import IntervalShowcase from '../components/blocks/Interval'
import SessioStorageShowcase from '../components/blocks/SessionStorage'

export default function Dashboard() {
  const [inputValue, setInputValue] = useState<string>('')
  const isFirstMount = useFirstMountState()
  const [queryString, setQueryString] = useState<string>('')
  const isTouchDevice = useIsTouchDevice()
  const orientation = useOrientation()
  const isClient = useIsClient()
  const throttledValue = useThrottle(inputValue, 500)
  const isLoaded = useWindowLoad()
  const windowSize = useWindowResize()
  const [userStatus, setUserStatus] = useState<string>('User is on the page')
  const [value, setValue] = useState<string>('')
  const divRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(observerRef, {
    threshold: 0.5,
  })
  const [count, setCount] = useState(0)
  const { setRef, inView } = useIsVisible({ threshold: 1 })
  const targetRef = useRef<HTMLDivElement>(null)
  const rect = useRect(targetRef)
  const [isResizing, setIsResizing] = useState<boolean>(false)

  const handlePageLeave = () => {
    setUserStatus('User left the page')
    console.log('User left the page')
  }

  usePageLeave(handlePageLeave)

  useEffect(() => {
    console.log('Throttled value:', throttledValue)
  }, [throttledValue])

  useEffect(() => {
    if (entry) {
      console.log(`Element is ${entry.isIntersecting ? 'visible' : 'hidden'}`)
    }
  }, [entry])

  useEffectOnce(() => {
    console.log('Effect ran only once')

    return () => {
      console.log('Effect cleaned up')
    }
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing && targetRef.current && rect) {
        const newWidth = e.clientX - rect.left
        const newHeight = e.clientY - rect.top

        ;(targetRef.current as HTMLDivElement).style.width = `${newWidth}px`
        ;(targetRef.current as HTMLDivElement).style.height = `${newHeight}px`
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, rect, targetRef])

  const KeySequenceTester = () => {
    useKeySequence({
      sequence: 'xd',
      callback: () => {
        alert('Key sequence detected!')
        console.log('Key sequence detected!')
      },
      eventType: 'keydown',
      keystrokeDelay: 1000,
    })
  }
  return (
    <div className="grid h-screen w-full pl-[53px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Home"
          >
            <Triangle className="size-5 fill-foreground" />
          </Button>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg bg-muted"
                  aria-label="React Hooks Showcase"
                >
                  <SquareTerminal className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={5}
              >
                React Hooks Showcase
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="mt-auto rounded-lg"
                  aria-label="Github"
                >
                  <GithubIcon className="size-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                sideOffset={5}
              >
                Help
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col">
        {/* Need to implement the drawer component to make this page responsive */}
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-base font-medium">
                  Hooks Block 1
                </legend>
                <ClipboardShowcase />
                <DebounceShowcase />
                <DebugShowcase />
                <DocumentReadyShowCase />
                <DocumentTitleShowcase />
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useDrag"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useDrag
                  </h2>
                  <Alert
                    id="useDrag"
                    message="This preview is under construction"
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-base font-medium">
                  Hooks Block 2
                </legend>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useEffectOnce"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useEffectOnce
                  </h2>
                  <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Check the console for the effect and cleanup messages.
                  </p>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useFavicon"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useFavicon
                  </h2>
                  <Alert
                    id="useFavicon"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useFetch"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useFetch
                  </h2>
                  <Alert
                    id="useFetch"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useFirstMountState"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useFirstMountState
                  </h2>
                  <div>
                    {isFirstMount ? (
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        🥇 First render
                      </p>
                    ) : (
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        🔜 Subsequent render
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useFoucFix"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useFoucFix
                  </h2>
                  <Alert
                    id="useFoucFix"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useGeolocation"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useGeolocation
                  </h2>
                  <Alert
                    id="useGeolocation"
                    message="This preview is under construction."
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-base font-medium">
                  Hooks Block 3
                </legend>
                <HoverShowase />
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useIntersectionObserver"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useIntersectionObserver
                  </h2>
                  <div
                    ref={observerRef}
                    className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <p>
                      ⬇️ Scroll this element into view to see it logged to the
                      console. l this element into view to see it logged to the
                      console.
                    </p>
                  </div>
                </div>
                <IntervalShowcase />
                <IOSToolbarStateShowcase />
                <ClientShowcase />
              </fieldset>
            </form>
          </div>
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-base font-medium">
                  Hooks Block 4
                </legend>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useIsomorphicLayoutEffect"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useIsomorphicLayoutEffect
                  </h2>
                  <Alert
                    id="useIsomorphicLayoutEffect"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useIsTouchDevice"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useIsTouchDevice
                  </h2>
                  <div>
                    {isTouchDevice ? (
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        👆🏻 Touch Device
                      </p>
                    ) : (
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        ❌ Not a Touch Device
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useIsVisible"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useIsVisible
                  </h2>
                  <div
                    ref={setRef}
                    className="py-6 text-center border-2 border-dashed rounded-lg"
                  >
                    {inView ? (
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        ✅ The heading is current in view!
                      </p>
                    ) : (
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        ❌ The heading is not in view
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useKeySequence"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useKeySequence
                  </h2>
                  <div>
                    Press <kbd>h</kbd> then <kbd>e</kbd> then <kbd>l</kbd> then{' '}
                    <kbd>l</kbd> then <kbd>o</kbd> to trigger the alert.
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useList"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useList
                  </h2>
                  <Alert
                    id="useList"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useMediaQuery"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useMediaQuery
                  </h2>
                  <Alert
                    id="useMediaQuery"
                    message="This preview is under construction."
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-base font-medium">
                  Hooks Block 5
                </legend>
                <MousePositionShowcase />
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useNetworkState"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useNetworkState
                  </h2>
                  <Alert
                    id="useNetworkState"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useOnClickOutside"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useOnCLickOutside
                  </h2>
                  <Alert
                    id="useOnCLickOutside"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useOrientation"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useOrientation
                  </h2>
                  <div id="useOrientation">
                    <p>Current angle: {orientation.angle}</p>
                    <p>Current type: {orientation.type}</p>
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="usePageLeave"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    usePageLeave
                  </h2>
                  <Alert
                    id="usePageLeave"
                    message="This section is under construction"
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useRect"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useRect
                  </h2>
                  <div
                    ref={targetRef}
                    style={{
                      width: '100px',
                      height: '100px',
                      backgroundColor: 'lightgray',
                      cursor: 'nwse-resize',
                      minHeight: '100px',
                      minWidth: '100px',
                      maxWidth: '350px',
                      maxHeight: '350px',
                    }}
                    onMouseDown={() => setIsResizing(true)}
                  ></div>
                  <pre className="select-none">
                    {JSON.stringify(rect, null, 2)}
                  </pre>
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-base font-medium">
                  Hooks Block 6
                </legend>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useScript"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useScript
                  </h2>
                  <Alert
                    id="useScript"
                    message="This preview is under construction."
                  />
                </div>

                <SessioStorageShowcase />
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useThrottle"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useThrottle
                  </h2>
                  <div>
                    <Input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Type your value"
                    />
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useUnmount"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useUnmount
                  </h2>
                  <Alert
                    id="useUnmount"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useUpdateEffect"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useUpdateEffect
                  </h2>
                  <Alert
                    id="useUpdateEffect"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useWindowLoad"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useWindowLoad
                  </h2>
                  <div className="py-6 text-center border-2 border-dashed rounded-lg">
                    {isLoaded ? (
                      <h1>Window has finished loading!</h1>
                    ) : (
                      <h1>Loading...</h1>
                    )}
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useWindowResize"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useWindowResize
                  </h2>
                  <div>
                    <p>Inner Width: {windowSize.innerWidth}</p>
                    <p>Inner Height: {windowSize.innerHeight}</p>
                    <p>Outer Width: {windowSize.outerWidth}</p>
                    <p>Outer Height: {windowSize.outerHeight}</p>
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useWindowSize"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useWindowSize
                  </h2>
                  <div>
                    <p>Window Size {JSON.stringify(windowSize)}</p>
                  </div>
                </div>
              </fieldset>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
