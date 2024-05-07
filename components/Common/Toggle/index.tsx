import { Sun, Moon } from "lucide-react";
import styles from "./index.module.css";

const ThemeToggle = () => {
  return (
    <div id="appearence" className={styles.content}>
      <button type="button" id="theme" aria-checked="false">
        <span className={styles.check}>
          <span className={styles.circle}>
            <span className={styles.iconInactive}>
              <Sun size={12} />
            </span>
            <span className={styles.icon}>
              <Moon size={12} />
            </span>
          </span>
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;