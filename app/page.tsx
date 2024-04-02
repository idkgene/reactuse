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
import { Input } from '../components/ui/input'
import { useDebounce } from '../hooks/useDebounce'
import { useDebug } from '../hooks/useDebug'
import { useDocumentReadyState } from '../hooks/useDocumentReadyState'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import useMousePosition from '../hooks/useMousePosition'

export default function Dashboard() {
  const [inputValue, setInputValue] = useState<string>('')
  const debouncedValue = useDebounce(inputValue, 500)
  const isDebugMode = useDebug()
  const readyState = useDocumentReadyState()
  const position = useMousePosition()
  const [title, setTitle] = useState<string>('')

  useDocumentTitle(title)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
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
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Hooks Block 1
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="useClipboard">useClipboard</Label>
                  <div id="useClipboard">
                    This preview is under construction.
                  </div>
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
                  <div id="useDrag">This preview is under construction</div>
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
                  <div id="useEffectOnce">
                    This preview is under construction.
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useEventListener">useEventListener</Label>
                  <div id="useEventListener">
                    This preview is under construction
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label id="useDebounce">useFavicon</Label>
                  <div id="useFavicon">This preview is under construction</div>
                </div>
                <div className="grid gap-3">
                  <Label id="useFetch">useFetch</Label>
                  <div id="useFetch">This preview is under construction</div>
                </div>
                <div className="grid gap-3">
                  <Label id="useFirstMountState">useFirstMountState</Label>
                  <div id="useFirstMountState">
                    This preview is under construction
                  </div>
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
                  <div id="useFouxFix">This preview is under construction.</div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useGeolocation">useGeolocation</Label>
                  <div id="useGeolocation">
                    This preview is under construction
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label id="useHover">useHover</Label>
                  <div id="useHover">This preview is under construction</div>
                </div>
                <div className="grid gap-3">
                  <Label id="useIdle">useIdle</Label>
                  <div id="useIdle">This preview is under construction</div>
                </div>
                <div className="grid gap-3">
                  <Label id="useIntersectionObserver">
                    useIntersectionObserver
                  </Label>
                  <div id="useIntersectionObserver">
                    This preview is under construction
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label id="useInterval">useInterval</Label>
                  <div id="useInterval">This preview is under construction</div>
                </div>
                <div className="grid gap-3">
                  <Label id="useIOSToolbarState">useIOSToolbarState</Label>
                  <div id="useIOSToolbarState">
                    This preview is under construction
                  </div>
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
                  <Label htmlFor="useFouxFix">useIsClient</Label>
                  <div id="useFouxFix">This preview is under construction.</div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useIsomorphicLayoutEffect">
                    useIsomorphicLayoutEffect
                  </Label>
                  <div id="useIsomorphicLayoutEffect">
                    This preview is under construction
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useIsTouchDevice">useIsTouchDevice</Label>
                  <div id="useIsTouchDevice">
                    This preview is under construction
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useIsVisible">useIsVisible</Label>
                  <div id="useIsVisible">
                    This preview is under construction
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useKeySequence">useKeySequence</Label>
                  <div id="useKeySequence">
                    This preview is under construction
                  </div>
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
                  <div id="useList">This preview is under construction.</div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useMediaQuery">useMediaQuery</Label>
                  <div id="useMediaQuery">
                    This preview is under construction
                  </div>
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
                  <div id="useNetworkState">
                    This preview is under construction
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useOnClickOutside">useOnCLickOutside</Label>
                  <div id="useOnClickOutside">
                    This preview is under construction
                  </div>
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
                    This preview is under construction.
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="usePageLeave">usePageLeave</Label>
                  <div id="usePageLeave">
                    This preview is under construction
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useRect">useRect</Label>
                  <div id="useRect">This preview is under construction</div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useScript">useScript</Label>
                  <div id="useScript">This preview is under construction</div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useSessionStorage">useSessionStorage</Label>
                  <div id="useSessionStorage">
                    This preview is under construction
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useThrottle">useThrottle</Label>
                  <div id="useThrottle">This preview is under construction</div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useUnmount">useUnmount</Label>
                  <div id="useUnmount">This preview is under construction</div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useUpdateEffect">useUpdateEffect</Label>
                  <div id="useUpdateEffect">
                    This preview is under construction
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useWindowLoad">useWindowLoad</Label>
                  <div id="useWindowLoad">
                    This preview is under construction
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useWindowResize">useWindowResize</Label>
                  <div id="useWindowResize">
                    This preview is under construction
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="useWindowSize">useWindowSize</Label>
                  <div id="useWindowSize">
                    This preview is under construction
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
