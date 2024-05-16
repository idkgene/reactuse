import * as React from 'react'
import Image from 'next/image'
import ReactLogo from '../../../public/react-icon.svg'
import { motion } from 'framer-motion'
import styles from './index.module.css'
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
              <Link
                href="/guide"
                className={styles.actionBrand}
                aria-label="Get started with ReactUse"
              >
                Get Started
              </Link>
            </div>
            <div id="action" className={styles.action}>
              <Link
                href="/hooks"
                className={styles.actionRegular}
                aria-label="Explore ReactUse hooks"
              >
                Hooks
              </Link>
            </div>
            <div id="action" className={styles.action}>
              <Link
                href="https://github.com/changeelog/react-hooks"
                className={styles.actionRegular}
                aria-label="View ReactUse on GitHub"
              >
                View on Github
              </Link>
            </div>
          </div>
        </div>
        <div
          id="image"
          className={styles.image}
          style={{ margin: 'auto' }}
          aria-hidden="true"
        >
          <div id="image-container" className={styles.imageContainer}>
            <div
              id="image-bg"
              className={styles.imageBg}
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
