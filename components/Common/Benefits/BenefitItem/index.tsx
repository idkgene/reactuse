import React from 'react'
import styles from './index.module.css'

interface BenefitsProps {
  icon: React.ReactNode
  heading: string
  paragraph: string
}

const BenefitsItem = React.forwardRef<HTMLDivElement, BenefitsProps>(
  ({ icon, heading, paragraph }, ref) => {
    return (
      <div className={styles.content} ref={ref}>
        <div className={styles.feature}>
          <article className={styles.box}>
            <div className={styles.icon}>{icon}</div>
            <h2 className={styles.title}>{heading}</h2>
            <p className={styles.details}>{paragraph}</p>
          </article>
        </div>
      </div>
    )
  }
)

BenefitsItem.displayName = 'BenefitsItem'

export { BenefitsItem }
