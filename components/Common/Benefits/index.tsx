import React from "react";

interface BenefitsProps {
  icon: React.ReactNode;
  heading: string;
  paragraph: string;
}

const BenefitsItem = React.forwardRef<HTMLDivElement, BenefitsProps>(
  ({ icon, heading, paragraph }, ref) => {
    return (
      <div
        className="bg-[#202127] border border-solid border-[#202127] rounded-[12px] transition-colors"
        ref={ref}
      >
        <article className="flex flex-col p-6 h-full">
          <div className="flex items-center justify-center mb-5 bg-[rgba(101,117,133,.16)] size-12 text-[24px] transition-colors rounded-md">
            {icon}
          </div>
          <h2 className="text-base font-semibold">{heading}</h2>
          <p>{paragraph}</p>
        </article>
      </div>
    );
  }
);

BenefitsItem.displayName = "BenefitsItem";

export { BenefitsItem };
