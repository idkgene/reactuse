'use client'
import { GithubIcon, Settings, SquareTerminal, Triangle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
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

export default function Dashboard() {
  const [inputValue, setInputValue] = useState<string>('')
  const debouncedValue = useDebounce(inputValue, 500)
  const isDebugMode = useDebug()
  const readyState = useDocumentReadyState()

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
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">React Hooks Showcase</h1>
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <Settings className="size-4" />
                <span className="sr-only">Block 1</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[80vh]">
              <DrawerHeader>
                <DrawerTitle>Configuration</DrawerTitle>
                <DrawerDescription>
                  Configure the settings for the model and messages.
                </DrawerDescription>
              </DrawerHeader>
              <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Settings
                  </legend>
                  <div className="grid gap-3"></div>
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Messages
                  </legend>
                  <div className="grid gap-3">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="system">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="system">System</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="assistant">Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="You are a..."
                    />
                  </div>
                </fieldset>
              </form>
            </DrawerContent>
          </Drawer>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <form className="grid w-full items-start gap-6">
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Block 1
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="model">useDebounce</Label>
                  <Input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type something"
                  />
                  <p>Debounced value: {debouncedValue}</p>
                </div>
                <div className="grid gap-3">
                  <Label>isDebug</Label>
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
              </fieldset>
              <fieldset className="grid gap-6 rounded-lg border p-4">
                <legend className="-ml-1 px-1 text-sm font-medium">
                  Messages
                </legend>
                <div className="grid gap-3">
                  <Label htmlFor="role">Role</Label>
                  <Select defaultValue="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="assistant">Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="You are a..."
                    className="min-h-[9.5rem]"
                  />
                </div>
              </fieldset>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}
