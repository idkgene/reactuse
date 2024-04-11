import { useInterval } from "@hooks/useInterval";
import { Info } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import styles from "./index.module.css";

export default function IntervalShowcase() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount((prevCount) => (prevCount + 1) % 25);
  }, 1000);

  return (
    <>
      <div className={styles.container}>
        <h2 id="useInterval">useInterval</h2>
        <div>
          <p>⏱ Count {count}</p>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-fit flex items-center gap-2 mt-6 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#9c9c9c]">
                  <Info size={16} color="#9c9c9c" />
                  Hover to see the tooltip
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="max-w-[50ch] text-justify"
              >
                <p>
                  In this case, the count counter is incremented by 1 every
                  second (1000 milliseconds) with useInterval. When the count
                  value reaches 25, it is reset back to 0.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
}
