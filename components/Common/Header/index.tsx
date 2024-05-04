import * as React from "react";

type NavigationProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const Navigation = React.forwardRef<HTMLElement, NavigationProps>(
  (props, ref) => {
    return (
      <nav ref={ref} {...props}>
        {props.children}
      </nav>
    );
  }
);

Navigation.displayName = "Navigation";
