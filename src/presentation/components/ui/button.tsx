import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm text-xs uppercase tracking-[0.22em] font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black hover:bg-neutral-200 shadow-sm",
        luxury:
          "luxury-btn bg-white text-black hover:bg-neutral-100 shadow-md",
        outline:
          "border border-white/20 bg-transparent text-white hover:bg-white/10 hover:border-white/40",
        secondary:
          "bg-[#17181c] border border-white/10 text-neutral-300 hover:text-white hover:border-white/30",
        ghost:
          "text-neutral-400 hover:text-white hover:bg-white/5",
        emerald:
          "border border-emerald-500/40 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-900/30 hover:border-emerald-400 font-mono",
        destructive:
          "bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 px-3 text-[11px]",
        lg: "h-12 px-7 text-sm",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
