import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2",
        {
          'border-transparent bg-white text-black hover:bg-white/80': variant === 'default',
          'border-transparent bg-zinc-800 text-white hover:bg-zinc-700': variant === 'secondary',
          'border-transparent bg-red-500 text-white hover:bg-red-600': variant === 'destructive',
          'text-white': variant === 'outline',
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
