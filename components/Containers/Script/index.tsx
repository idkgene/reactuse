import { useEffect, useState } from "react";
import useScript from "../../../hooks/useScript";
import styles from "./index.module.css";

export default function ScriptShowcase() {
  const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);

  useScript("https://code.jquery.com/jquery-3.6.0.min.js");

  useEffect(() => {
    const scriptElement = document.querySelector(
      'script[src="https://code.jquery.com/jquery-3.6.0.min.js"]'
    );
    if (scriptElement) {
      setIsScriptLoaded(true);
    }
  }, []);
  return (
    <>
      <div className={styles.container}>
        <h2 id="useScript">useScript</h2>
        {isScriptLoaded ? (
          <p>Script is loaded!</p>
        ) : (
          <p>Script is not loaded yet.</p>
        )}
      </div>
    </>
  );
}
