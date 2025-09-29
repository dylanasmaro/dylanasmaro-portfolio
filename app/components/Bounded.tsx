import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: ReactNode; // <-- Fix: use ReactNode, not never or ReactElement[]
  [key: string]: any;
};

const Bounded = forwardRef<HTMLElement, BoundedProps>(
  ({ as: Comp = "section", className, children, ...restProps }, ref) => {
    return (
      <Comp ref={ref} className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)} {...restProps}>
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </Comp>
    );
  }
);

export default Bounded;