'use client'
import { GithubIcon, SquareTerminal, Triangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useEffect, useRef, useState } from 'react'
import Alert from '../components/ui/alert'
import { Input } from '../components/ui/input'
import { useDebounce } from '../hooks/useDebounce'
import { useDebug } from '../hooks/useDebug'
import { useDocumentReadyState } from '../hooks/useDocumentReadyState'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useEffectOnce } from '../hooks/useEffectOnce'
import { useFirstMountState } from '../hooks/useFirstMountState'
import { useHover } from '../hooks/useHover'
import { useIdle } from '../hooks/useIdle'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useInterval } from '../hooks/useInterval'
import { useIsClient } from '../hooks/useIsClient'
import { useMediaQuery } from '../hooks/useMediaQuery'
import useMousePosition from '../hooks/useMousePosition'
import { useOrientation } from '../hooks/useOrientation'
import { usePageLeave } from '../hooks/usePageLeave'
import useThrottle from '../hooks/useThrottle'
import useWindowLoad from '../hooks/useWindowLoad'
import useWindowResize from '../hooks/useWindowResize'

export default function Dashboard() {
  const [inputValue, setInputValue] = useState<string>('')
  const debouncedValue = useDebounce(inputValue, 500)
  const isDebugMode = useDebug()
  const readyState = useDocumentReadyState()
  const isFirstMount = useFirstMountState()
  const position = useMousePosition()
  const [title, setTitle] = useState<string>('')
  const [queryString, setQueryString] = useState<string>('')
  const isMatch = useMediaQuery(queryString)
  const orientation = useOrientation()
  const isClient = useIsClient()
  const throttledValue = useThrottle(inputValue, 500)
  const isLoaded = useWindowLoad()
  const windowSize = useWindowResize()
  const [userStatus, setUserStatus] = useState<string>('User is on the page')
  const [value, setValue] = useState<string>('')
  const [hoverRef, isHovered] = useHover<HTMLDivElement>()
  const isIdle = useIdle(60000) // 1 minute
  const divRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(observerRef, {
    threshold: 0.5,
  })
  const [count, setCount] = useState(0)

  useDocumentTitle(title)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

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

  useInterval(() => {
    setCount((prevCount) => (prevCount + 1) % 25)
  }, 1000)

  useEffectOnce(() => {
    console.log('Effect ran only once')

    return () => {
      console.log('Effect cleaned up')
    }
  })

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
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useDeboune"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useClipboard
                  </h2>
                  <Alert
                    id="useClipboard"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useDeboune"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useDebounce
                  </h2>
                  <Input
                    className="mt-3"
                    type="text"
                    id="useDebounce"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type something"
                    aria-describedby="debouncedValue"
                  />
                  <p
                    id="debouncedValue"
                    className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Debounced value: {debouncedValue}
                  </p>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useDebug"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useDebug
                  </h2>
                  {isDebugMode ? (
                    <div>
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        🛠️ The application is running in debug mode.
                      </p>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      🚀 The application is running in production mode.
                    </p>
                  )}
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useDocumentReadyState"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useDocumentReadyState
                  </h2>
                  <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Current ready state: {readyState}
                  </p>
                  {readyState === 'loading' && (
                    <p>⌛ The document is still loading.</p>
                  )}
                  {readyState === 'interactive' && (
                    <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      🕹️ The document has finished parsing but is still loading
                      sub-resources.
                    </p>
                  )}
                  {readyState === 'complete' && (
                    <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      ✅ The document and all sub-resources have finished
                      loading.
                    </p>
                  )}
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <h2
                    id="useDocumentTitle"
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    useDocumentTitle
                  </h2>
                  <Input
                    type="text"
                    className="mt-3"
                    value={title}
                    onChange={handleChange}
                    maxLength={15}
                    id="useDocumentTitle"
                    placeholder="Enter a new document title"
                  />
                  <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Current document title: {title}
                  </p>
                </div>
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
                  <Label htmlFor="useEffectOnce">useEffectOnce</Label>
                  <p>Check the console for the effect and cleanup messages.</p>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label id="useFavicon">useFavicon</Label>
                  <Alert
                    id="useFavicon"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label id="useFetch">useFetch</Label>
                  <Alert
                    id="useFetch"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label id="useFirstMountState">useFirstMountState</Label>
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
                  <Label htmlFor="useFouxFix">useFouxFix</Label>
                  <Alert
                    id="useFouxFix"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useGeolocation">useGeolocation</Label>
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
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label id="useHover">useHover</Label>
                  <div
                    ref={hoverRef}
                    className="py-6 text-center border-2 border-dashed rounded-lg"
                  >
                    {isHovered ? (
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        ✅ Hovered
                      </p>
                    ) : (
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        ❌ Not Hovered
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label id="useIdle">useIdle</Label>
                  <div>
                    {isIdle ? (
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        🦥 User is idle
                      </p>
                    ) : (
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        🙋🏻‍♂️ User is active
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label id="useIntersectionObserver">
                    useIntersectionObserver
                  </Label>
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
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label id="useInterval">useInterval</Label>
                  <div>
                    <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      ⏱ Count {count}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label id="useIOSToolbarState">useIOSToolbarState</Label>
                  <Alert
                    id="useIOSToolbarState"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useIsClient">useIsClient</Label>
                  <div>
                    {isClient ? (
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        💻 Running on the client-side
                      </p>
                    ) : (
                      <p className="mt-3 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        🗄️ Running on the server-side
                      </p>
                    )}
                  </div>
                </div>
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
                  <Label htmlFor="useIsomorphicLayoutEffect">
                    useIsomorphicLayoutEffect
                  </Label>
                  <Alert
                    id="useIsomorphicLayoutEffect"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useIsTouchDevice">useIsTouchDevice</Label>
                  <Alert
                    id="useIsTouchDevice"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useIsVisible">useIsVisible</Label>
                  <Alert
                    id="useIsVisible"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useKeySequence">useKeySequence</Label>
                  <Alert
                    id="useKeySequence"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useList">useList</Label>
                  <Alert
                    id="useList"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useMediaQuery">useMediaQuery</Label>
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
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useMousePosition">useMousePosition</Label>
                  <div id="useMousePosition">
                    <p>
                      X: {position.x}, Y: {position.y}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useNetworkState">useNetworkState</Label>
                  <Alert
                    id="useNetworkState"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useOnClickOutside">useOnCLickOutside</Label>
                  <Alert
                    id="useOnCLickOutside"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useOrientation">useOrientation</Label>
                  <div id="useOrientation">
                    <p>Current angle: {orientation.angle}</p>
                    <p>Current type: {orientation.type}</p>
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="usePageLeave">usePageLeave</Label>
                  <div>
                    <p>{userStatus}</p>
                    <p>
                      Click outside of this page to trigger the `usePageLeave`
                      hook.
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useRect">useRect</Label>
                  <Alert
                    id="useRect"
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
                  Hooks Block 6
                </legend>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useScript">useScript</Label>
                  <Alert
                    id="useScript"
                    message="This preview is under construction."
                  />
                </div>

                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useSessionStorage">useSessionStorage</Label>
                  <Alert
                    id="useSessionStorage"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useThrottle">useThrottle</Label>
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
                  <Label htmlFor="useUnmount">useUnmount</Label>
                  <Alert
                    id="useUnmount"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useUpdateEffect">useUpdateEffect</Label>
                  <Alert
                    id="useUpdateEffect"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useWindowLoad">useWindowLoad</Label>
                  <div>
                    {isLoaded ? (
                      <h1>Window has finished loading!</h1>
                    ) : (
                      <h1>Loading...</h1>
                    )}
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useWindowResize">useWindowResize</Label>
                  <div>
                    <p>Inner Width: {windowSize.innerWidth}</p>
                    <p>Inner Height: {windowSize.innerHeight}</p>
                    <p>Outer Width: {windowSize.outerWidth}</p>
                    <p>Outer Height: {windowSize.outerHeight}</p>
                  </div>
                </div>
                <div className="grid gap-3 p-4 border rounded-lg">
                  <Label htmlFor="useWindowSize">useWindowSize</Label>
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
