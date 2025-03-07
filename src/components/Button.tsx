
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "icon";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", fullWidth = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-50",
          
          // Variants
          variant === "primary" && "bg-primary text-primary-foreground shadow hover:bg-primary/90",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          variant === "outline" && "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground",
          variant === "link" && "text-primary underline-offset-4 hover:underline",
          variant === "icon" && "bg-transparent hover:bg-accent/50 rounded-full",
          
          // Sizes
          size === "sm" && "h-8 rounded-md px-3 text-xs",
          size === "md" && "h-9 rounded-md px-4 text-sm",
          size === "lg" && "h-10 rounded-md px-6 text-base",
          size === "icon" && "h-9 w-9 rounded-full p-0",
          
          // Full width
          fullWidth && "w-full",
          
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
