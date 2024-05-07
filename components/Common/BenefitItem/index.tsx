import React from "react";
import styles from "./index.module.css";

interface BenefitsProps {
  icon: React.ReactNode;
  heading: string;
  paragraph: string;
}

const BenefitsItem = React.forwardRef<HTMLDivElement, BenefitsProps>(
  ({ icon, heading, paragraph }, ref) => {
    return (
      <div className={styles.content} ref={ref}>
        <article className={styles.article}>
          <div>{icon}</div>
          <h2>{heading}</h2>
          <p>{paragraph}</p>
        </article>
      </div>
    );
  }
);

BenefitsItem.displayName = "BenefitsItem";

export { BenefitsItem };
