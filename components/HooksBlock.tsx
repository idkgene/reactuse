import React from "react";

const HooksBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative hidden flex-col items-start gap-8 md:flex">
      <form className="grid w-full items-start gap-6">
        <fieldset className="grid gap-6 rounded-lg border p-4">
          <legend className="-ml-1 px-1 text-base font-medium">{title}</legend>
          {children}
        </fieldset>
      </form>
    </div>
  );
};

export default HooksBlock;
