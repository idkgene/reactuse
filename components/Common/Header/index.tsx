import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ReactLogo from "../../../public/react-icon.svg";
import { Input } from "@/components/UI/input";
import TelegramIcon from "../../../public/telegram.svg";
import Toggle from "../Toggle";
import Link from "next/link";
import { ChevronDown, GithubIcon, Sun, Moon, Search } from "lucide-react";
import ThemeToggle from "../Toggle";

export const Navigation = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <>
      <Link href="/main" className="sr-only">
        Skip to Main
      </Link>
      <header
        className="top-0 left-0 w-full pointer-events-none transition-colors z-30 lg:fixed"
        ref={ref}
        {...props}
      >
        <div className="relative whitespace-nowrap transition-colors h-16">
          <div id="wrapper" className="pt-0 pl-2 pb-0 pr-6">
            <div className="container flex justify-between my-0 mx-auto max-w-[calc(1440px-64px)] h-16 pointer-events-none">
              <div
                id="title"
                className="pointer-events-none shrink-0 transition-colors h-[calc(64px-1px)]"
              >
                <div>
                  <Link
                    href="/"
                    className="flex items-center border-b border-solid border-transparent w-full h-16 text-base font-semibold transition-opacity text-[rgba(255,255,245,.86)]"
                  >
                    <Image
                      src={ReactLogo}
                      alt="React Logo"
                      height={32}
                      width={32}
                      className="mr-2 h-6"
                    />

                    <span className="pointer-events-auto">ReactUse</span>
                  </Link>
                </div>
              </div>
              <div id="content" className="pointer-events-none grow">
                <div
                  id="content-body"
                  className="flex justify-end items-center transition-colors h-16"
                >
                  <div
                    id="search"
                    className="flex items-center md:grow md:pl-6 lg:pl-8"
                  >
                    <div id="docsearch">
                      <button
                        type="button"
                        id="docsearchbutton"
                        className="flex justify-center items-center m-0 p-0 h-12 w-[55px] bg-transparent transition-colors md:justify-start md:border md:border-solid md:border-transparent md:rounded-[8px] md:pt-0 md:pl-[10px] md:pb-[0px] md:pr-[12px] md:w-full md:h-10 md:bg-[#161618]"
                      >
                        <span id="container" className="flex items-center">
                          <span className="relative w-4 h-4 fill-current transition-colors text-[#rgba(255,255,245,.86)] md:top-px md:mr-2 md:w-[14px] md:h-[14px] md:text-[rgba(235,235,245,.6)]">
                            <Search size={14} />
                          </span>
                          <span className="hidden mt-0.5 pr-4 text-[13px] font-medium text-[rgba(235,235,245,.6)] transition-colors md:inline-block">
                            Search
                          </span>
                        </span>
                        <span
                          id="keys"
                          className="min-w-[auto] hidden md:flex md:items-center"
                        >
                          <kbd
                            className="!text-[0px] block mt-0.5 border-y border-l border-solid border-[#2e2e32] rounded-l-[4px] pl-1.5 min-w-0 w-auto h-[22px] leading-[22px] font-medium transition-colors after:content-['Ctrl'] after:text-[12px] after:tracking-normal after:text-[rgba(235,235,245,.6)]"
                            id="buttonkey"
                          ></kbd>
                          <kbd
                            className="block mt-0.5 border-solid border-[#2e2e32] pl-0.5 min-w-0 w-auto h-[22px] leading-[22px] font-medium transition-colors border-r border-y border-r-[#2e2e32] border-l-[none] rounded-r-[4px] pr-1.5 text-[12px]
                            text-[rgba(235,235,245,.6)]"
                            id="buttonkey"
                          >
                            K
                          </kbd>
                        </span>
                      </button>
                    </div>
                  </div>
                  <nav
                    aria-labelledby="main-nav-aria-label"
                    className="hidden md:flex"
                    id="navbar-menu"
                  >
                    <span className="sr-only" id="main-nav-aria-label">
                      Main Navigation
                    </span>
                    <Link
                      href="/"
                      className="flex items-center p-0 px-3 text-sm leading-[64px] font-medium transition-colors text-[rgba(255,255,245,.86)]"
                    >
                      Playground
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center p-0 px-3 text-sm leading-[64px] font-medium transition-colors text-[rgba(255,255,245,.86)]"
                    >
                      Playground
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center p-0 px-3 text-sm leading-[64px] font-medium transition-colors text-[rgba(255,255,245,.86)]"
                    >
                      Playground
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center p-0 px-3 text-sm leading-[64px] font-medium transition-colors text-[rgba(255,255,245,.86)]"
                    >
                      Playground
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center p-0 px-3 text-sm leading-[64px] font-medium transition-colors text-[rgba(255,255,245,.86)]"
                    >
                      Playground
                    </Link>
                  </nav>
                  <ThemeToggle />
                  <div
                    className="-mr-2 hidden xl:flex xl:items-center before:ml-4 before:mr-2 before:w-px before:h-6 before:bg-[#2e2e32] before:content-['']"
                    id="socials"
                  >
                    <Link
                      href="example.com"
                      className="flex items-center justify-center size-9 transition-colors rgba(235,235,245,.6)"
                    >
                      <span className="size-5 fill-current">
                        {" "}
                        <GithubIcon />
                      </span>
                    </Link>
                    <Link
                      href="example.com"
                      className="flex items-center justify-center size-9 transition-colors rgba(235,235,245,.6)"
                    >
                      <span className="size-5 fill-current">
                        <GithubIcon />
                      </span>
                    </Link>
                    <Link
                      href="example.com"
                      className="flex items-center justify-center size-9 transition-colors rgba(235,235,245,.6)"
                    >
                      <span className="size-5 fill-current">
                        {" "}
                        <GithubIcon />
                      </span>
                    </Link>
                  </div>
                  <button
                    type="button"
                    aria-label="Mobile Navigation"
                    aria-expanded="false"
                    aria-controls=""
                    className="md:hidden w-12 h-16"
                  >
                    <span className="container relative h-[14px] w-[16px]">
                      <span
                        id="top"
                        className="top-0 left-0 absolute w-4 h-0.5 transition-colors bg-[rgba(255,255,245,.86)] translate-x-0 translate-y-0"
                      ></span>
                      <span
                        id="mid"
                        className="top-1.5 left-0 absolute w-4 h-0.5 transition-colors bg-[rgba(255,255,245,.86)]"
                        style={{ transform: "translate(8px)" }}
                      ></span>
                      <span
                        id="bottom"
                        className="top-3 left-0 absolute w-4 h-0.5 transition-colors bg-[rgba(255,255,245,.86)]"
                        style={{ transform: "translate(4px)" }}
                      ></span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div id="divider" className="w-full h-px">
            <div
              id="divider-line"
              className="w-full h-px transition-colors"
            ></div>
          </div>
        </div>
      </header>
    </>
  );
});

Navigation.displayName = "Navigation";
