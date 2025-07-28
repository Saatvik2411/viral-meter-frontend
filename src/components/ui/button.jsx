import * as React from "react";
import { cn } from '../../lib/utils';


export const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-medium shadow-sm transition-colors hover:bg-blue-700 focus:outline-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";
