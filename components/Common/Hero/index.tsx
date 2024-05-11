import * as React from 'react'
import Image from 'next/image'
import ReactLogo from '../../../public/react-icon.svg'
import { motion } from 'framer-motion'
import styles from './index.module.css'

export const Hero = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      style={{
        marginTop: 'calc((64px + var(--vp-layout-top-height, 0px))* -1)',
        padding:
          'calc(64px + var(--vp-layout-top-height, 0px) + 48px) 24px 48px',
      }}
    >
      <div className={`${styles.container} container`}>
        <div className={styles.main}>
          <h1 id="name" className={styles.name}>
            <span id="clip" className={styles.clip}>
              ReactUse
            </span>
          </h1>
          <p id="text" className={styles.text}>
            Collection of React Utilities
          </p>
          <p id="tagline" className={styles.tagline}>
            Collection of Essential React Hooks Utilities
          </p>
          <div id="actions" className={styles.actions}>
            <div id="action" className={styles.action}>
              <a href="/guide" className={styles.actionBrand}>
                Get Started
              </a>
            </div>
            <div id="action" className={styles.action}>
              <a href="/hooks" className={styles.actionRegular}>
                Hooks
              </a>
            </div>
            <div id="action" className={styles.action}>
              <a
                href="https://github.com/changeelog/react-hooks"
                className={styles.actionRegular}
              >
                View on Github
              </a>
            </div>
          </div>
        </div>
        <div id="image" className={styles.image} style={{ margin: 'auto' }}>
          <div id="image-container" className={styles.imageContainer}>
            <div
              id="image-bg"
              className={styles.imageBg}
              style={{
                backgroundImage:
                  'linear-gradient( -45deg, #166271 30%, #35495e80 )',
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
                className={styles.logo}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
})

Hero.displayName = 'Hero'
