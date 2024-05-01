"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { GithubIcon, SquareTerminal, Triangle } from "lucide-react";
import { Suspense } from "react";
import Spinner from "../components/Spinner";
import ClientShowcase from "@/components/Containers/Client";
import ClipboardShowcase from "@/components/Containers/Clipboard";
import DebounceShowcase from "@/components/Containers/Debounce";
import DebugShowcase from "@/components/Containers/Debug";
import DocumentReadyShowCase from "@/components/Containers/DocumentReady";
import DocumentTitleShowcase from "@/components/Containers/DocumentTitle";
import DragShowcase from "@/components/Containers/Drag";
// import FetchShowcase from "@/components/Containers/Fetch";
import FirstMountStateShowcase from "@/components/Containers/FirstMountState";
import GeolocationShowcase from "@/components/Containers/Geolocation";
import HoverShowase from "@/components/Containers/Hover";
import IntersectionObserverShowcase from "@/components/Containers/IntersectionObserver";
import IntervalShowcase from "@/components/Containers/Interval";
import IOSToolbarStateShowcase from "@/components/Containers/IOSToolbarState";
import IsomorphicLayoutEffect from "@/components/Containers/IsomorphicLayoutEffect";
import IsTouchDeviceShowcase from "@/components/Containers/IsTouchDevice";
import IsVisibleShowcase from "@/components/Containers/IsVisible";
import ListShowcase from "@/components/Containers/List";
import MediaQueryShowcase from "@/components/Containers/MediaQuery";
import MousePositionShowcase from "@/components/Containers/MousePosition";
import NetworkState from "@/components/Containers/NetworkState";
import OrientationShowcase from "@/components/Containers/Orientation";
import RectShowcase from "@/components/Containers/Rect";
import ScriptShowcase from "@/components/Containers/Script";
import ThrottleShowcase from "@/components/Containers/Throttle";
import UpdateEffectShowcase from "@/components/Containers/UpdateEffect";
import UseEffectOnceShowcase from "@/components/Containers/EffectOnce";
import UnmountShowcase from "@/components/Containers/Unmount";
import WindowLoadShowcase from "@/components/Containers/WindowLoad";
import WindowResizeShowcase from "@/components/Containers/WindowResize";
import WindowSizeShowcase from "@/components/Containers/WindowSize";
import ComponentTest from "@/components/Containers/Default";
import HooksBlock from "@/components/HooksBlock";
import { Button } from "@/components/UI/button";

export default function Dashboard() {
  return (
    <div className="grid h-screen w-full pl-[53px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Button variant="outline" size="icon" aria-label="Home">
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
              <TooltipContent side="right" sideOffset={5}>
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
              <TooltipContent side="right" sideOffset={5}>
                Help
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col">
        {/* Need to implement the drawer component to make this page responsive */}
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <Suspense fallback={<Spinner />}>
            <HooksBlock title="Hooks Block">
              <Suspense fallback={<Spinner />}>
                <ClipboardShowcase />
                <DebounceShowcase />
                <DebugShowcase />
                <DocumentReadyShowCase />
                <DocumentTitleShowcase />
                <DragShowcase />
                <UseEffectOnceShowcase />
                {/* <FetchShowcase /> */}
                <FirstMountStateShowcase />
                <GeolocationShowcase />
                <HoverShowase />
              </Suspense>
            </HooksBlock>
          </Suspense>

          <Suspense>
            <HooksBlock title="Hooks Block 2">
              <Suspense>
                <IntersectionObserverShowcase />
                <IntervalShowcase />
                <IOSToolbarStateShowcase />
                <ClientShowcase />
                <IsomorphicLayoutEffect />
                <IsTouchDeviceShowcase />
                <IsVisibleShowcase />
                <ListShowcase />
                <MediaQueryShowcase />
                <MousePositionShowcase />
                <NetworkState />
              </Suspense>
            </HooksBlock>
          </Suspense>

          <HooksBlock title="Hooks Block 3">
            <OrientationShowcase />
            <RectShowcase />
            <ScriptShowcase />
            <ThrottleShowcase />
            <UnmountShowcase />
            <UpdateEffectShowcase />
            <WindowLoadShowcase />
            <WindowResizeShowcase />
            <WindowSizeShowcase />
            <ComponentTest />
          </HooksBlock>
        </main>
      </div>
    </div>
  );
}
