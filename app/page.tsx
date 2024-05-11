"use client";
import React from "react";
import { Footer } from "@/components/Common/Footer";
import { Hero } from "@/components/Common/Hero";

export default function Home() {
  return (
    <>
      <main className="container mx-auto px-32 py-12 lg:py-16 ">
        <Hero />
        <section className="relative py-0 px-6 sm:px-10 lg:px-16">
          <div className="container mx-auto my-auto">
            <div id="items" className="flex flex-wrap -m-2">
              <div className="w-full p-2 sm:w-1/2 md:w-[calc(100%/2)]">
                <div
                  id="noicon feature"
                  className="transition-colors h-full rounded-[12px] block border border-solid border-[#202127] bg-[#202127]"
                >
                  <article id="box" className="flex flex-col p-6 h-full">
                    <div
                      id="icon"
                      className="flex justify-center items-center mb-5 rounded-[6px]] size-12 text-[24px] transition-colors bg-[rgba(101,117,133,.16)]"
                    >
                      🎛️
                    </div>
                    <h2
                      id="title"
                      className="leading-[24px] text-[16px] font-semibold"
                    >
                      Feature Rich
                    </h2>
                    <p
                      id="details"
                      className="grow pt-2 leading-[24px] text-[14px] font-medium text-[rgba(235,235,245,.6)]"
                    >
                      50+ function for you to choose from
                    </p>
                  </article>
                </div>
              </div>

              <div className="w-full p-2 sm:w-1/2 md:w-[calc(100%/2)]">
                <div
                  id="noicon feature"
                  className="transition-colors h-full rounded-[12px] block border border-solid border-[#202127] bg-[#202127]"
                >
                  <article id="box" className="flex flex-col p-6 h-full">
                    <div
                      id="icon"
                      className="flex justify-center items-center mb-5 rounded-[6px]] size-12 text-[24px] transition-colors bg-[rgba(101,117,133,.16)]"
                    >
                      🚀
                    </div>
                    <h2
                      id="title"
                      className="leading-[24px] text-[16px] font-semibold"
                    >
                      Seamless integration
                    </h2>
                    <p
                      id="details"
                      className="grow pt-2 leading-[24px] text-[14px] font-medium text-[rgba(235,235,245,.6)]"
                    >
                      Works with React and Next.js
                    </p>
                  </article>
                </div>
              </div>

              <div className="w-full p-2 sm:w-1/2 md:w-[calc(100%/2)]">
                <div
                  id="noicon feature"
                  className="transition-colors h-full rounded-[12px] block border border-solid border-[#202127] bg-[#202127]"
                >
                  <article id="box" className="flex flex-col p-6 h-full">
                    <div
                      id="icon"
                      className="flex justify-center items-center mb-5 rounded-[6px]] size-12 text-[24px] transition-colors bg-[rgba(101,117,133,.16)]"
                    >
                      ⚡
                    </div>
                    <h2
                      id="title"
                      className="leading-[24px] text-[16px] font-semibold"
                    >
                      Fully tree shakeable
                    </h2>
                    <p
                      id="details"
                      className="grow pt-2 leading-[24px] text-[14px] font-medium text-[rgba(235,235,245,.6)]"
                    >
                      Only take what you want
                    </p>
                  </article>
                </div>
              </div>

              <div className="w-full p-2 sm:w-1/2 md:w-[calc(100%/2)]">
                <div
                  id="noicon feature"
                  className="transition-colors h-full rounded-[12px] block border border-solid border-[#202127] bg-[#202127]"
                >
                  <article id="box" className="flex flex-col p-6 h-full">
                    <div
                      id="icon"
                      className="flex justify-center items-center mb-5 rounded-[6px]] size-12 text-[24px] transition-colors bg-[rgba(101,117,133,.16)]"
                    >
                      🦾
                    </div>
                    <h2
                      id="title"
                      className="leading-[24px] text-[16px] font-semibold"
                    >
                      Type Strong
                    </h2>
                    <p
                      id="details"
                      className="grow pt-2 leading-[24px] text-[14px] font-medium text-[rgba(235,235,245,.6)]"
                    >
                      Written in TypeScript, with full TS docs
                    </p>
                  </article>
                </div>
              </div>

              <div className="w-full p-2 sm:w-1/2 md:w-[calc(100%/2)]">
                <div
                  id="noicon feature"
                  className="transition-colors h-full rounded-[12px] block border border-solid border-[#202127] bg-[#202127]"
                >
                  <article id="box" className="flex flex-col p-6 h-full">
                    <div
                      id="icon"
                      className="flex justify-center items-center mb-5 rounded-[6px]] size-12 text-[24px] transition-colors bg-[rgba(101,117,133,.16)]"
                    >
                      🛠️
                    </div>
                    <h2
                      id="title"
                      className="leading-[24px] text-[16px] font-semibold"
                    >
                      Flexible
                    </h2>
                    <p
                      id="details"
                      className="grow pt-2 leading-[24px] text-[14px] font-medium text-[rgba(235,235,245,.6)]"
                    >
                      Passing refs as arguments, fully customizable,
                      configurable event filters and targets
                    </p>
                  </article>
                </div>
              </div>

              <div className="w-full p-2 sm:w-1/2 md:w-[calc(100%/2)]">
                <div
                  id="noicon feature"
                  className="transition-colors h-full rounded-[12px] block border border-solid border-[#202127] bg-[#202127]"
                >
                  <article id="box" className="flex flex-col p-6 h-full">
                    <div
                      id="icon"
                      className="flex justify-center items-center mb-5 rounded-[6px]] size-12 text-[24px] transition-colors bg-[rgba(101,117,133,.16)]"
                    >
                      ☁️
                    </div>
                    <h2
                      id="title"
                      className="leading-[24px] text-[16px] font-semibold"
                    >
                      No bundler required
                    </h2>
                    <p
                      id="details"
                      className="grow pt-2 leading-[24px] text-[14px] font-medium text-[rgba(235,235,245,.6)]"
                    >
                      Usable via CDN, without any bundlers
                    </p>
                  </article>
                </div>
              </div>

              <div className="w-full p-2 sm:w-1/2 md:w-[calc(100%/2)]">
                <div
                  id="noicon feature"
                  className="transition-colors h-full rounded-[12px] block border border-solid border-[#202127] bg-[#202127]"
                >
                  <article id="box" className="flex flex-col p-6 h-full">
                    <div
                      id="icon"
                      className="flex justify-center items-center mb-5 rounded-[6px]] size-12 text-[24px] transition-colors bg-[rgba(101,117,133,.16)]"
                    >
                      🔋
                    </div>
                    <h2
                      id="title"
                      className="leading-[24px] text-[16px] font-semibold"
                    >
                      SSR Friendly
                    </h2>
                    <p
                      id="details"
                      className="grow pt-2 leading-[24px] text-[14px] font-medium text-[rgba(235,235,245,.6)]"
                    >
                      Works perfectly with server-side rendering/generation
                    </p>
                  </article>
                </div>
              </div>

              <div className="w-full p-2 sm:w-1/2 md:w-[calc(100%/2)]">
                <div
                  id="noicon feature"
                  className="transition-colors h-full rounded-[12px] block border border-solid border-[#202127] bg-[#202127]"
                >
                  <article id="box" className="flex flex-col p-6 h-full">
                    <div
                      id="icon"
                      className="flex justify-center items-center mb-5 rounded-[6px]] size-12 text-[24px] transition-colors bg-[rgba(101,117,133,.16)]"
                    >
                      🎪
                    </div>
                    <h2
                      id="title"
                      className="leading-[24px] text-[16px] font-semibold"
                    >
                      Interactive demos
                    </h2>
                    <p
                      id="details"
                      className="grow pt-2 leading-[24px] text-[14px] font-medium text-[rgba(235,235,245,.6)]"
                    >
                      Documentation of functions also come with interactive
                      demos!
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
