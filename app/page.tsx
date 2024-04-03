'use client'
import { GithubIcon, SquareTerminal, Triangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import ClipboardShowcase from '@ui-showcase/Clipboard'
import DebounceShowcase from '@ui-showcase/Debounce'
import DebugShowcase from '@ui-showcase/Debug'
import DocumentReadyShowCase from '@ui-showcase/DocumentReady'
import HoverShowase from '@ui-showcase/Hover'
import MousePositionShowcase from '@ui-showcase/MousePosition'
import ClientShowcase from '../components/blocks/Client'
import DocumentTitleShowcase from '../components/blocks/DocumentTitle'
import DragShowcase from '../components/blocks/Drag'
import FaviconShowcase from '../components/blocks/Favicon'
import FetchShowcase from '../components/blocks/Fetch'
import FirstMountStateShowcase from '../components/blocks/FirstMountState'
import FoucFixShowcase from '../components/blocks/FoucFix'
import GeolocationShowcase from '../components/blocks/Geolocation'
import HooksBlock from '../components/blocks/HooksBlock'
import IOSToolbarStateShowcase from '../components/blocks/IOSToolbarState'
import IntersectionObserverShowcase from '../components/blocks/IntersectionObserver'
import IntervalShowcase from '../components/blocks/Interval'
import IsTouchDeviceShowcase from '../components/blocks/IsTouchDevice'
import IsVisibleShowcase from '../components/blocks/IsVisible'
import IsomorphicLayoutEffect from '../components/blocks/IsomorphicLayoutEffect'
import KeySequenceShowcase from '../components/blocks/KeySequence'
import ListShowcase from '../components/blocks/List'
import MediaQueryShowcase from '../components/blocks/MediaQuery'
import NetworkState from '../components/blocks/NetworkState'
import OnClickOutsideShowcase from '../components/blocks/OnClickOutside'
import OrientationShowcase from '../components/blocks/Orientation'
import PageLeaveShowcase from '../components/blocks/PageLeave'
import RectShowcase from '../components/blocks/Rect'
import ScriptShowcase from '../components/blocks/Script'
import SessioStorageShowcase from '../components/blocks/SessionStorage'
import ThrottleShowcase from '../components/blocks/Throttle'
import UnmountShowcase from '../components/blocks/Unmount'
import UpdateEffectShowcase from '../components/blocks/UpdateEffect'
import UseEffectOnceShowcase from '../components/blocks/UseEffectOnce'
import WindowLoadShowcase from '../components/blocks/WindowLoad'
import WindowResizeShowcase from '../components/blocks/WindowResize'
import WindowSizeShowcase from '../components/blocks/WindowSize'

export default function Dashboard() {
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
          <HooksBlock title="Hooks Block">
            <ClipboardShowcase />
            <DebounceShowcase />
            <DebugShowcase />
            <DocumentReadyShowCase />
            <DocumentTitleShowcase />
            <DragShowcase />
          </HooksBlock>

          <HooksBlock title="Hooks Block 2">
            <UseEffectOnceShowcase />
            <FaviconShowcase />
            <FetchShowcase />
            <FirstMountStateShowcase />
            <FoucFixShowcase />
            <GeolocationShowcase />
          </HooksBlock>

          <HooksBlock title="Hooks Block 3">
            <HoverShowase />
            <IntersectionObserverShowcase />
            <IntervalShowcase />
            <IOSToolbarStateShowcase />
            <ClientShowcase />
          </HooksBlock>

          <HooksBlock title="Hooks Block 4">
            <IsomorphicLayoutEffect />
            <IsTouchDeviceShowcase />
            <IsVisibleShowcase />
            <KeySequenceShowcase />
            <ListShowcase />
            <MediaQueryShowcase />
          </HooksBlock>

          <HooksBlock title="Hooks Block 5">
            <MousePositionShowcase />
            <NetworkState />
            <OnClickOutsideShowcase />
            <OrientationShowcase />
            <PageLeaveShowcase />
            <RectShowcase />
          </HooksBlock>

          <HooksBlock title="Hooks Block 6">
            <ScriptShowcase />
            <SessioStorageShowcase />
            <ThrottleShowcase />
            <UnmountShowcase />
            <UpdateEffectShowcase />
            <WindowLoadShowcase />
            <WindowResizeShowcase />
            <WindowSizeShowcase />
          </HooksBlock>
        </main>
      </div>
    </div>
  )
}
