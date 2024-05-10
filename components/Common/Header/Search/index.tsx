import { Search } from "lucide-react";
import styles from "../index.module.css";

export function Searchbar() {
  return (
    <>
      <div id="search" className={styles.search}>
        <div className={styles.docsearch}>
          <button type="button" className={styles.docsearchBtn}>
            <span className={styles.docsearchContainer}>
              <span className={styles.docsearchIcon}>
                <Search size={14} />
              </span>
              <span className={styles.docsearchPlaceholder}>Search</span>
            </span>
            <span className={styles.keys}>
              <kbd className={styles.afterBtnKey}></kbd>
              <kbd className={styles.btnKey}>K</kbd>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
