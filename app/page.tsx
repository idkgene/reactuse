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
import { useState } from 'react'
import Alert from '../components/ui/alert'
import { Input } from '../components/ui/input'
import { useDebounce } from '../hooks/useDebounce'
import { useDebug } from '../hooks/useDebug'
import { useDocumentReadyState } from '../hooks/useDocumentReadyState'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useMediaQuery } from '../hooks/useMediaQuery'
import useMousePosition from '../hooks/useMousePosition'
import { useOrientation } from '../hooks/useOrientation'
import { usePageLeave } from '../hooks/usePageLeave'
import useWindowLoad from '../hooks/useWindowLoad'
import useWindowResize from '../hooks/useWindowResize'

export default function Dashboard() {
  const [inputValue, setInputValue] = useState<string>('')
  const debouncedValue = useDebounce(inputValue, 500)
  const isDebugMode = useDebug()
  const readyState = useDocumentReadyState()
  const position = useMousePosition()
  const [title, setTitle] = useState<string>('')
  const [queryString, setQueryString] = useState<string>('')
  const isMatch = useMediaQuery(queryString)
  const orientation = useOrientation()
  const isLoaded = useWindowLoad()
  const windowSize = useWindowResize()
  const [userStatus, setUserStatus] = useState<string>('User is on the page')

  useDocumentTitle(title)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handlePageLeave = () => {
    setUserStatus('User left the page')
    console.log('User left the page')
  }

  usePageLeave(handlePageLeave)

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
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Hooks Block 1
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="useClipboard">useClipboard</Label>
                  <Alert
                    id="useClipboard"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useDeboune">useDebounce</Label>
                  <Input
                    type="text"
                    id="useDebounce"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type something"
                    aria-describedby="debouncedValue"
                  />
                  <p id="debouncedValue">Debounced value: {debouncedValue}</p>
                </div>
                <div className="grid gap-3">
                  <Label id="useDebounce">useDebugMode</Label>
                  {isDebugMode ? (
                    <div>
                      <p>The application is running in debug mode.</p>
                    </div>
                  ) : (
                    <p>The application is running in production mode.</p>
                  )}
                </div>
                <div className="grid gap-3">
                  <p>Current ready state: {readyState}</p>
                  {readyState === 'loading' && (
                    <p>The document is still loading.</p>
                  )}
                  {readyState === 'interactive' && (
                    <p>
                      The document has finished parsing but is still loading
                      sub-resources.
                    </p>
                  )}
                  {readyState === 'complete' && (
                    <p>
                      The document and all sub-resources have finished loading.
                    </p>
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useDocumentTitle">useDocumentTitle</Label>
                  <Input
                    type="text"
                    value={title}
                    onChange={handleChange}
                    maxLength={30}
                    id="useDocumentTitle"
                    placeholder="Enter a new document title"
                  />
                  <p>Current document title: {title}</p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useDrag">useDrag</Label>
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
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Hooks Block 2
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="useEffectOnce">useEffectOnce</Label>
                  <Alert
                    id="useEffectOnce"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label id="useDebounce">useFavicon</Label>
                  <Alert
                    id="useFavicon"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label id="useFetch">useFetch</Label>
                  <Alert
                    id="useFetch"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label id="useFirstMountState">useFirstMountState</Label>
                  <Alert
                    id="useFirstMountState"
                    message="This preview is under construction."
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Hooks Block 3
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="useFouxFix">useFouxFix</Label>
                  <Alert
                    id="useFouxFix"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useGeolocation">useGeolocation</Label>
                  <Alert
                    id="useGeolocation"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label id="useHover">useHover</Label>
                  <Alert
                    id="useHover"
                    message="This preview is under construction."
                  />{' '}
                </div>
                <div className="grid gap-3">
                  <Label id="useIdle">useIdle</Label>
                  <Alert
                    id="useIdle"
                    message="This preview is under construction."
                  />{' '}
                </div>
                <div className="grid gap-3">
                  <Label id="useIntersectionObserver">
                    useIntersectionObserver
                  </Label>
                  <Alert
                    id="useIntersectionObserver"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label id="useInterval">useInterval</Label>
                  <Alert
                    id="useInterval"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label id="useIOSToolbarState">useIOSToolbarState</Label>
                  <Alert
                    id="useIOSToolbarState"
                    message="This preview is under construction."
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Hooks Block 4
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="useIsClient">useIsClient</Label>
                  <Alert
                    id="useIsClient"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useIsomorphicLayoutEffect">
                    useIsomorphicLayoutEffect
                  </Label>
                  <Alert
                    id="useIsomorphicLayoutEffect"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useIsTouchDevice">useIsTouchDevice</Label>
                  <Alert
                    id="useIsTouchDevice"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useIsVisible">useIsVisible</Label>
                  <Alert
                    id="useIsVisible"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useKeySequence">useKeySequence</Label>
                  <Alert
                    id="useKeySequence"
                    message="This preview is under construction."
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Hooks Block 5
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="useList">useList</Label>
                  <Alert
                    id="useList"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useMediaQuery">useMediaQuery</Label>
                  <Alert
                    id="useMediaQuery"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useMousePosition">useMousePosition</Label>
                  <div id="useMousePosition">
                    <p>
                      X: {position.x}, Y: {position.y}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useNetworkState">useNetworkState</Label>
                  <Alert
                    id="useNetworkState"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useOnClickOutside">useOnCLickOutside</Label>
                  <Alert
                    id="useOnCLickOutside"
                    message="This preview is under construction."
                  />
                </div>
              </fieldset>
            </form>
          </div>
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Hooks Block 6
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="useOrientation">useOrientation</Label>
                  <div id="useOrientation">
                    <p>Current angle: {orientation.angle}</p>
                    <p>Current type: {orientation.type}</p>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="usePageLeave">usePageLeave</Label>
                  <div>
                    <p>{userStatus}</p>
                    <p>
                      Click outside of this page to trigger the `usePageLeave`
                      hook.
                    </p>
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useRect">useRect</Label>
                  <Alert
                    id="useRect"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useScript">useScript</Label>
                  <Alert
                    id="useScript"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useSessionStorage">useSessionStorage</Label>
                  <Alert
                    id="useSessionStorage"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useThrottle">useThrottle</Label>
                  <Alert
                    id="useThrottle"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useUnmount">useUnmount</Label>
                  <Alert
                    id="useUnmount"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useUpdateEffect">useUpdateEffect</Label>
                  <Alert
                    id="useUpdateEffect"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useWindowLoad">useWindowLoad</Label>
                  <div>
                    {isLoaded ? (
                      <h1>Window has finished loading!</h1>
                    ) : (
                      <h1>Loading...</h1>
                    )}
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useWindowResize">useWindowResize</Label>
                  <Alert
                    id="useWindowResize"
                    message="This preview is under construction."
                  />
                </div>
                <div className="grid gap-3">
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
