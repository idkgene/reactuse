import useWindowLoad from "../../../hooks/useWindowLoad";
import styles from "./index.module.css";

export default function WindowLoadShowcase() {
  const isLoaded = useWindowLoad();

  return (
    <>
      <div className={styles.container}>
        <h2 id="useWindowLoad">useWindowLoad</h2>
        <div>
          {isLoaded ? (
            <h1>Window has finished loading!</h1>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </div>
    </>
  );
}
