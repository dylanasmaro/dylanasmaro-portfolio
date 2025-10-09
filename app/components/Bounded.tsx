import { ReactNode, forwardRef, ElementType } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

const Bounded = forwardRef<HTMLElement, BoundedProps & React.ComponentPropsWithoutRef<ElementType>>(
  ({ as: Comp = "section", className, children, ...restProps }, ref) => {
    return (
      <Comp 
        ref={ref} 
        className={clsx("px-4 py-10 md:px-6 md:py-14 lg:py-16", className)} 
        {...restProps}
      >
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </Comp>
    );
  }
);

Bounded.displayName = "Bounded";

export default Bounded;