import React, {
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_FORM_ACTIONS,
} from "react";

interface BenefitsProps {
  children: React.ReactNode;
}

const BenefitItem = React.forwardRef<HTMLDivElement, BenefitsProps>(
  (props, ref) => {
    return <div className="grid gap-2 grid-cols-3" ref={ref} {...props}></div>;
  }
);

BenefitItem.displayName = "BenefitItem";

export { BenefitItem };
