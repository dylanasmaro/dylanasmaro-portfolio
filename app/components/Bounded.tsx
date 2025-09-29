import { ReactNode, forwardRef } from "react";
import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: ReactNode;
};

const Bounded = forwardRef<
  Element,
  BoundedProps & React.ComponentPropsWithoutRef<any>
>(
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

Bounded.displayName = "Bounded";

export default Bounded;