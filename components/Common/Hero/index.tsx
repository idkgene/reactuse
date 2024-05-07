import * as React from "react";
import Image from "next/image";
import ReactLogo from "../../../public/react-icon.svg";
import { motion } from "framer-motion";

export const Hero = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      <div
        ref={ref}
        {...props}
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
          width={256}
          height={256}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:max-w-[256px] sm:max-h-[256px] lg:max-w-[320px] lg:max-h-[320px]"
        />
      </motion.div>
    </div>
  );
});

Hero.displayName = "Hero";
