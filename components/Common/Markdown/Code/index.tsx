'use client'
import React, { useEffect, useState, forwardRef, HTMLAttributes } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import styles from './index.module.css'
import { CopyIcon, CopySuccessIcon } from '../../Icons/Copy'
import { motion, AnimatePresence } from 'framer-motion'

interface PrismProps {
  code: string
  language: string
  languages?: string[]
}

interface CodeProps extends HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  filename?: string
  prism?: PrismProps
  noHeader?: boolean
}

export const Code = forwardRef<HTMLDivElement, CodeProps>(
  ({ icon, filename, prism, children, noHeader, ...rest }, ref) => {
    useEffect(() => {
      if (prism) {
        Prism.highlightAll()
      }
    }, [prism, prism?.code, prism?.language])
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = async () => {
      if (prism) {
        await navigator.clipboard.writeText(prism.code)
        setIsCopied(!isCopied)
        setTimeout(() => setIsCopied(false), 1000)
      }
    }

    return (
      <div className={styles.wrapper} {...rest} ref={ref}>
        <div className={styles.inner}>
          <div aria-label="Label" className={styles.label}>
            {!noHeader && (
              <div className={styles.header} id="header">
                <div id="filename" className={styles.filename}>
                  <div id="icon" aria-hidden="true" className={styles.icon}>
                    {icon}
                  </div>
                  <span id="filename-text" className={styles.filenameText}>
                    {filename}
                  </span>
                </div>
                {prism && (
                  <div id="action" className="flex gap-1">
                    <div id="switch-container" className="relative">
                      <div className={styles.langSwitcherVisible}>
                        <select
                          name="lang-switcher"
                          id="lang-switcher"
                          className={styles.langSwitcher}
                        >
                          {prism.languages?.map((lang) => (
                            <option key={lang} value={lang}>
                              {lang}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <AnimatePresence>
                        <motion.button
                          type="button"
                          aria-label="Copy code"
                          className={styles.copyBtn}
                          onClick={handleCopy}
                          initial={{ scale: 1 }}
                          animate={{ scale: isCopied ? 1 : 1 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                        >
                          {isCopied ? <CopySuccessIcon /> : <CopyIcon />}
                        </motion.button>
                      </AnimatePresence>
                    </div>
                  </div>
                )}
              </div>
            )}
            {prism ? (
              <pre
                className={`line-numbers rounded-r-[6px] py-5 m-0 overflow-x-auto`}
              >
                <code
                  className={`language-${prism.language} line-numbers`}
                >{`${prism.code}`}</code>
              </pre>
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    )
  }
)

Code.displayName = 'Code'
