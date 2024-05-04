"use client";
import React from "react";
import Image from "next/image";
import ReactLogo from "../public/react-icon.svg";
import { Input } from "@/components/UI/input";
import GithubIcon from "../public/github.svg";
import TelegramIcon from "../public/telegram.svg";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <nav className="mx-56">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 text-base font-semibold">
              <motion.div
                whileHover={{ rotate: 180, scale: 0.9 }}
                transition={{ ease: [0.08, 0.52, 0.52, 1], duration: 0.7 }}
              >
                <Image
                  src={ReactLogo}
                  alt="React Logo"
                  height={32}
                  width={32}
                />
              </motion.div>
              ReactUse
            </span>
            <div>
              <Input type="search" placeholder="Search" className="w-fit" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <div>
              <ul className="flex">
                <li className="h-16 px-3 justify-center items-center flex">
                  Guide
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </li>
                <li className="h-16 px-3 justify-center items-center flex">
                  Functions
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </li>
              </ul>
            </div>
            <div className="flex gap-2 items-center before:ml-4 before:mr-2 before:w-px before:h-6 before:contents-[''] before:bg-[#202127]">
              Theme
            </div>
            <div>
              <ul className="flex gap-2 items-center before:ml-4 before:mr-2 before:w-px before:h-6 before:contents-[''] before:bg-[#202127]">
                <li>
                  <Image
                    src={GithubIcon}
                    alt="Github Icon"
                    className="stroke-white"
                    height={20}
                    width={20}
                  />
                </li>
                <li>
                  <Image
                    src={TelegramIcon}
                    alt="Telegram Icon"
                    height={20}
                    width={20}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/*  */}
      {/* MAIN SECTION */}
      {/*  */}
      <main className="container mx-auto px-32 py-12 lg:py-16 ">
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center pb-12 lg:pb-16">
          <div className="order-2 lg:order-1">
            <h1 className="text-[32px] md:text-5xl lg:text-[56px] tracking-[-0.4px] leading-[1.15] font-bold">
              <span>ReactUse</span>
            </h1>
            <p className="text-[32px] md:text-5xl lg:text-[56px] tracking-[-0.4px] leading-[1.15] font-bold max-w-[392px] sm:max-w-[576px]">
              A collection of utilities for React and Next
            </p>
            <p className="text-lg md:text-xl  lg:text-2xl leading-[1.5] font-medium">
              A collection of basic utilities for working with React and Next JS
            </p>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative my-0 mx-auto size-[320px] sm:size-[392px] lg:size-full lg:-translate-x-[32px] lg:-translate-y-[32px] lg:flex lg:justify-center lg:items-center">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-[256px] sm:max-h-[256px] lg:max-w-[320px] lg:max-h-[320px] blur-[72px]"
                style={{
                  backgroundImage:
                    "linear-gradient( -45deg, #41b88380 30%, #35495e80 )",
                }}
              ></div>
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-[256px] sm:max-h-[256px] lg:max-w-[320px] lg:max-h-[320px]"
                whileHover={{ rotate: 180, scale: 0.9 }}
                transition={{ ease: [0.08, 0.52, 0.52, 1], duration: 0.7 }}
              >
                <Image
                  src={ReactLogo}
                  alt="ReactUse"
                  width={192}
                  height={192}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-[256px] sm:max-h-[256px] lg:max-w-[320px] lg:max-h-[320px]"
                />
              </motion.div>
            </div>
          </div>
        </div>
        {/* benefits */}
        <div className="grid gap-2 grid-cols-3">
          {/* first  */}
          <div className="bg-[#202127] border border-solid border-[#202127] rounded-[12px] transition-colors">
            <article className="flex flex-col p-6 h-full">
              <div className="flex items-center justify-center mb-5 bg-[rgba(101,117,133,.16)] size-12 text-[24px] transition-colors rounded-md">
                🎛️
              </div>
              <h2 className="text-base font-semibold">Feature Rich</h2>
              <p>200+ functions for you to choose from</p>
            </article>
          </div>

          {/* second  */}
          <div className="bg-[#202127] border border-solid border-[#202127] rounded-[12px] transition-colors">
            <article className="flex flex-col p-6 h-full">
              <div className="flex items-center justify-center mb-5 bg-[rgba(101,117,133,.16)] size-12 text-[24px] transition-colors rounded-md">
                🚀
              </div>
              <h2 className="text-base font-semibold">
                Incredible performance
              </h2>
              <p className="grow pt-2 text-sm leading-[24px] font-medium text-[rgba(235,235,245,.6">
                50+ functions for you to choose from
              </p>
            </article>
          </div>

          {/* third */}
          <div className="bg-[#202127] border border-solid border-[#202127] rounded-[12px] transition-colors">
            <article className="flex flex-col p-6 h-full">
              <div className="flex items-center justify-center mb-5 bg-[rgba(101,117,133,.16)] size-12 text-[24px] transition-colors rounded-md">
                ⚡
              </div>
              <h2 className="text-base font-semibold">Fully tree shakeable</h2>
              <p className="grow pt-2 text-sm leading-[24px] font-medium text-[rgba(235,235,245,.6">
                Only take what you want
              </p>
            </article>
          </div>

          {/* fourth  */}
          <div className="bg-[#202127] border border-solid border-[#202127] rounded-[12px] transition-colors">
            <article className="flex flex-col p-6 h-full">
              <div className="flex items-center justify-center mb-5 bg-[rgba(101,117,133,.16)] size-12 text-[24px] transition-colors rounded-md">
                🦾
              </div>
              <h2 className="text-base font-semibold">Type Strong</h2>
              <p className="grow pt-2 text-sm leading-[24px] font-medium text-[rgba(235,235,245,.6">
                Written in TypeScript, with full TS docs
              </p>
            </article>
          </div>

          {/* fifth  */}
          <div className="bg-[#202127] border border-solid border-[#202127] rounded-[12px] transition-colors">
            <article className="flex flex-col p-6 h-full">
              <div className="flex items-center justify-center mb-5 bg-[rgba(101,117,133,.16)] size-12 text-[24px] transition-colors rounded-md">
                🛠️
              </div>
              <h2 className="text-base font-semibold">Flexible</h2>
              <p className="grow pt-2 text-sm leading-[24px] font-medium text-[rgba(235,235,245,.6)">
                Passing refs as arguments, fully customizable, configurable
                event filters and targets
              </p>
            </article>
          </div>

          {/* sixth  */}
          <div className="bg-[#202127] border border-solid border-[#202127] rounded-[12px] transition-colors">
            <article className="flex flex-col p-6 h-full">
              <div className="flex items-center justify-center mb-5 bg-[rgba(101,117,133,.16)] size-12 text-[24px] transition-colors rounded-md">
                🎪
              </div>
              <h2 className="text-base font-semibold">Interactive demos</h2>
              <p className="grow pt-2 text-sm leading-[24px] font-medium text-[rgba(235,235,245,.6">
                Documentation of functions also come with interactive demos!
              </p>
            </article>
          </div>
        </div>
      </main>
      <footer className="max-w-[1152px] mx-auto text-center text-[14px] leading-[24px] font-medium text-[rgba(255,255,245,.6)]">
        Released under the MIT License.
      </footer>
    </>
  );
}
