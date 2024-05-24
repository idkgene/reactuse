import * as React from 'react'
import Image from 'next/image'
import ReactLogo from '../../../public/react-icon.svg'
import { motion } from 'framer-motion'
import Link from 'next/link'

export const Hero = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className="p-0"
      style={{
        marginTop: 'calc((64px + var(--vp-layout-top-height, 0px))* -1)',
        padding:
          'calc(64px + var(--vp-layout-top-height, 0px) + 48px) 24px 48px',
      }}
      aria-labelledby="name"
      role="banner"
    >
      <div className="container flex !p-0 flex-col lg:flex-row text-center lg:text-left">
        <div className="relative z-10 order-2 grow shrink-0 lg:order-1 mx-auto lg:w-[calc((100%/3)*2)] lg:max-w-[592px]">
          <h1
            id="name"
            className="whitespace-pre font-bold text-[32px] leading-[40px] tracking-[-.4px] max-w-[392px] text-transparent sm:max-w-[576px] sm:leading-[56px] sm:text-[48px] lg:text-[56px] lg:leading-[64px] mx-0 my-auto lg:m-0"
          >
            <span
              id="clip"
              className="bg-gradient-to-r from-[#6693f9] via-[#58dffd] to-[#62e0ef] bg-clip-text"
            >
              ReactUse
            </span>
          </h1>
          <p
            id="text"
            className="whitespace-break-spaces font-bold text-[#3c3c43] dark:text-[#fffff5db]  text-[32px] leading-10 tracking-[-.4px] max-w-[392px] sm:text-[48px] sm:leading-[56px] sm:max-w-[576px] lg:text-[56px] lg:leading-[64px] mx-0 my-auto lg:m-0"
          >
            Collection of React Utilities
          </p>
          <p
            id="tagline"
            className="text-[hsla(240,6%,25%,1)] dark:text-[hsla(240,33%,94%,1)] whitespace-break-spaces font-medium text-lg max-w-[392px] pt-2 sm:text-xl sm:leading-[1.6] sm:max-w-[576px] sm:pt-3 lg:text-2xl lg:leading-[36px] mx-0 my-auto lg:m-0"
          >
            Collection of Essential React Hooks Utilities
          </p>
          <div
            id="actions"
            className="flex flex-wrap -m-1.5 pt-6 sm:pt-8 justify-center lg:justify-start"
          >
            <div id="action" className="shrink p-1.5">
              <Link
                href="/docs/guide"
                className="inline-block border border-solid text-center font-semibold whitespace-nowrap transition-colors rounded-[20px] py-0 px-5 text-sm leading-[38px] border-transparent bg-[#6793f9] hover:bg-[hsl(222,92%,75%)]"
                aria-label="Get started with ReactUse"
              >
                Get Started
              </Link>
            </div>
            <div id="action" className="shrink p-1.5">
              <Link
                href="/hooks"
                className="inline-block border border-solid text-center font-semibold whitespace-nowrap transition-colors rounded-[20px] py-0 px-5 text-sm leading-[38px] border-transparent text-[hsl(240,6%,25%)] bg-[hsl(240,11%,93%)] hover:bg-[hsl(216,12%,84%)]"
                aria-label="Explore ReactUse hooks"
              >
                Hooks
              </Link>
            </div>
            <div id="action" className="shrink p-1.5">
              <Link
                href="https://github.com/changeelog/react-hooks"
                className="inline-block border border-solid text-center font-semibold whitespace-nowrap transition-colors rounded-[20px] py-0 px-5 text-sm leading-[38px] border-transparent text-[hsl(240,6%,25%)] bg-[hsl(240,11%,93%)] hover:bg-[hsl(216,12%,84%)]"
                aria-label="View ReactUse on GitHub"
              >
                View on Github
              </Link>
            </div>
          </div>
        </div>
        <div
          id="image"
          className="order-1 w-fit -mt-[76px] -mx-6 -mb-12 sm:mt-[-108px] sm:-mx-6 sm:-mb-12 lg:grow lg:order-2 lg:mt-0 lg:min-h-full"
          style={{ margin: 'auto' }}
          aria-hidden="true"
        >
          <div
            id="image-container"
            className="relative mx-0 my-auto size-[160px] md:size-[392px] lg:flex lg:justify-center lg:items-center lg:w-full lg:h-full lg:-translate-x-8 -translate-y-8"
          >
            <div
              id="image-bg"
              className="absolute top-1/2 left-1/2 rounded-[50%] size-[192px] blur-[72px] -translate-x-1/2 -translate-y-1/2"
              style={{
                backgroundImage:
                  'linear-gradient( -45deg, #61DAFB 30%, #13131310 )',
              }}
            ></div>

            <motion.div
              whileHover={{ rotate: 180, scale: 0.9 }}
              transition={{ ease: [0.08, 0.52, 0.52, 1], duration: 0.7 }}
            >
              <Image
                src={ReactLogo}
                alt="ReactUse Logo"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-[160px] sm:max-h-[160px]  md:max-w-[256px] md:max-h-[256px] lg:max-w-[320px] lg:max-h-[320px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
})

Hero.displayName = 'Hero'
