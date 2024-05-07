import React, {,
} from "react";

interface BenefitsProps {
  children: React.ReactNode;
}

const Benefits = React.forwardRef<HTMLDivElement, BenefitsProps>(
  (props, ref) => {
    return <div className="grid gap-2 grid-cols-3" ref={ref} {...props}></div>;
  }
);

Benefits.displayName = "Benefits";

export { Benefits };
