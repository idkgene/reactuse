'use client'
import * as React from 'react'
import Link from 'next/link'
import { ThemeToggle } from '../Toggle/index'
import { GithubIcon } from '../Icons/Github/icon'
import { TelegramIcon } from '../Icons/Telegram/icon'
import { DiscordIcon } from '../Icons/Discord/icon'
import { Searchbar } from './Search'
import { ReactUseLogo } from './Logo'
import { SocialsIcon } from './SocialsIcon'

export const Navigation = React.forwardRef<
  HTMLElement,
  { className?: string; cntClassName?: string }
>((props, ref) => {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileNavExpanded, setMobileNavExpanded] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsScrolled(scrollTop > 0)
      localStorage.setItem('isScrolled', JSON.stringify(scrollTop > 0))
    }

    window.addEventListener('scroll', handleScroll)

    const isScrolledFromStorage = JSON.parse(
      localStorage.getItem('isScrolled') || 'false'
    )
    setIsScrolled(isScrolledFromStorage)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMobileNav = () => {
    setMobileNavExpanded(!mobileNavExpanded)
  }

  return (
    <>
      <Link href="#main" className="sr-only">
        Skip to Main
      </Link>
      <header
        className={`top-0 left-0 w-full z-30 lg:fixed transition-colors ${isScrolled ? 'bg-[#fff] dark:bg-[#1b1b1f]' : ''}`}
        ref={ref}
        {...props}
        role="navigation"
      >
        <div className="relative h-16 transition-colors whitespace-nowrap">
          <div className="pt-0 pl-2 pb-0 pr-6">
            <div className="flex justify-between my-0 mx-auto max-w-[calc(1440px-64px)] h-16 container">
              <ReactUseLogo />
              <div className="grow">
                <div className="flex justify-end items-center transition-colors h-16">
                  <Searchbar />
                  <nav
                    aria-labelledby="main-nav-aria-label"
                    className="hidden md:flex"
                    id="navbar-menu"
                  >
                    <span className="sr-only" id="main-nav-aria-label">
                      Main Navigation
                    </span>
                    <Link
                      href="/guide"
                      className="flex items-center p-0 px-3 text-sm leading-[64px] font-medium transition-colors text-[hsl(240,6%,25%)] dark:text-[hsl(60,100%,98%)]"
                    >
                      Guide
                    </Link>
                    <Link
                      href="/hooks"
                      className="flex items-center p-0 px-3 text-sm leading-[64px] font-medium transition-colors text-[hsl(240,6%,25%)] dark:text-[hsl(60,100%,98%)]"
                    >
                      Hooks
                    </Link>
                  </nav>
                  <ThemeToggle />
                  <div className="-mr-2 hidden xl:flex xl:items-center before:ml-4 before:mr-2 before:w-px before:h-6 before:bg-[hsl(240,2%,89%)] dark:before:bg-[hsl(240,4%,19%)] before:content-['']">
                    <SocialsIcon
                      href="https://github.com/changeelog"
                      label="Visit our GitHub"
                      icon={<GithubIcon />}
                    />
                    <SocialsIcon
                      href="#"
                      label="Visit our Discord"
                      icon={<DiscordIcon />}
                    />
                    <SocialsIcon
                      href="https://t.me/destroy2create"
                      label="Visit our Telegra"
                      icon={<TelegramIcon />}
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Toggle Mobile Navigation"
                    aria-expanded={mobileNavExpanded}
                    aria-controls="navbar-menu"
                    className="md:hidden w-12 h-16"
                    onClick={toggleMobileNav}
                  >
                    <span className="relative h-[14px] w-4 container">
                      <span
                        id="top"
                        className="top-0 left-0 absolute w-4 h-0.5 transition-colors bg-[hsla(60,100%,98%,1)] translate-x-0 translate-y-0"
                      ></span>
                      <span
                        id="mid"
                        className="top-1.5 left-0 absolute w-4 h-0.5 transition-colors bg-[hsla(60,100%,98%,1)]"
                        style={{ transform: 'translate(8px)' }}
                      ></span>
                      <span
                        id="bottom"
                        className="top-3 left-0 absolute w-4 h-0.5 transition-colors bg-[hsla(60,100%,98%,1)]"
                        style={{ transform: 'translate(4px)' }}
                      ></span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-px">
            <div
              className={`w-full h-px transition-colors ${
                isScrolled
                  ? 'bg-[rgb(226,226,227)] dark:bg-[#2e2e32]'
                  : 'bg-transparent'
              }`}
            ></div>
          </div>
        </div>
      </header>
    </>
  )
})

Navigation.displayName = 'Navigation'
