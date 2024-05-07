import * as React from "react";
import Image from "next/image";
import ReactLogo from "../../../public/react-icon.svg";
import { motion } from "framer-motion";
import styles from "./index.module.css";

export const Hero = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      style={{
        marginTop: "calc((64px + var(--vp-layout-top-height, 0px))* -1)",
        padding:
          "calc(64px + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;",
      }}
    >
      <div className="container flex flex-col mx-auto lg:flex-row text-center lg:text-left">
        <div
          id="main"
          className="relative z-10 order-2 grow shrink-0 lg:order-1 lg:w-[calc((100%/3)*2)] lg:max-w-[592px]"
        >
          <h1
            id="name"
            className="whitespace-pre font-bold text-[32px] leading-[40px] tracking-[-.4px] max-w-[392px] text-transparent sm:max-w-[576px] sm:leading-[56px] sm:text-[48px] lg:text-[56px] lg:leading-[64px] mx-0 my-auto lg:m-0"
          >
            <span id="clip" className="text-white">
              ReactUse
            </span>
          </h1>
          <p
            id="text"
            className="whitespace-break-spaces font-bold text-[32px] leading-[40px] tracking-[-.4px] max-w-[392px] sm:text-[48px] sm:leading-[56px] sm:max-w-[576px] lg:text-[56px] lg:leading-[64px] mx-0 my-auto lg:m-0"
          >
            Collection of Vue Composition Utilities
          </p>
          <p
            id="tagline"
            className="text-[rgba(235,235,245,.6)] whitespace-break-spaces font-medium text-[18px] leading-[28px] max-w-[392px] pt-[8px] sm:text-[20px] sm:leading-[32px] sm:max-w-[576px] sm:pt-[12px] lg:text-[24px] lg:leading-[36px] mx-0 my-auto lg:m-0"
          >
            Collection of Essential Vue Composition Utilities
          </p>
        </div>
        <div
          id="image"
          className="order-1 mt-[-76px] mx-[-24px] mb-[-48px] sm:mt-[-108px] sm:mx-[-24px] sm:mb-[-48px] lg:grow lg:order-2 lg:mt-0 lg:min-h-[100%]"
        >
          <div
            id="image-container"
            className="relative mx-0 my-auto size-[320px] sm:size-[392px] lg:flex lg:justify-center lg:items-center lg:w-full lg:h-full lg:translate-x-[-32px] translate-y-[-32px]"
          >
            <div
              id="image-bg"
              className="absolute top-1/2 left-1/2 rounded-[50%] size-[192px] blur-[72px] translate-x-[-50%] translate-y-[-50%]"
              style={{
                backgroundImage:
                  "linear-gradient( -45deg, #166271 30%, #35495e80 )",
              }}
            ></div>

            <motion.div
              whileHover={{ rotate: 180, scale: 0.9 }}
              transition={{ ease: [0.08, 0.52, 0.52, 1], duration: 0.7 }}
            >
              <Image
                src={ReactLogo}
                alt="ReactUse"
                width={256}
                height={256}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-[256px] sm:max-h-[256px] lg:max-w-[320px] lg:max-h-[320px]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
});

Hero.displayName = "Hero";
