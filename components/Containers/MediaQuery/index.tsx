import { useMediaQuery } from "../../../hooks/useMediaQuery";
import styles from "./index.module.css";

export default function MediaQueryShowcase() {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const isMediumScreen = useMediaQuery(
    "(min-width: 768px) and (max-width: 1023px)"
  );
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  return (
    <>
      <div className={styles.container}>
        <h2 id="useMediaQuery">useMediaQuery</h2>
        <div>
          {isSmallScreen && <p>You are on a small screen.</p>}
          {isMediumScreen && <p>You are on a medium screen.</p>}
          {isLargeScreen && <p>You are on a large screen.</p>}
        </div>
      </div>
    </>
  );
}
