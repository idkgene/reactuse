import React from "react";
import styles from "./index.module.css";

interface BenefitsProps {
  children: React.ReactNode;
}

const Benefits = React.forwardRef<HTMLDivElement, BenefitsProps>(
  (props, ref) => {
    return <div className={styles.container} ref={ref} {...props}></div>;
  }
);

Benefits.displayName = "Benefits";

export { Benefits };
