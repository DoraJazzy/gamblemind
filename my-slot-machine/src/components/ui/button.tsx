import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
