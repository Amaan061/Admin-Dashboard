import * as React from "react"

import { cn } from "@/lib/utils"

import { Eye, EyeOff } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { togglePassword?: boolean }>(
  ({ className, type, togglePassword, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    const isPassword = type === "password" && togglePassword;
    return (
      <div className="relative">
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          className={cn(
            "flex h-14 w-full rounded-md border border-input bg-background px-4 py-3 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input"

export { Input }
