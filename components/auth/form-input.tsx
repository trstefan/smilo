import { InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { WarningCircle } from "@phosphor-icons/react/dist/ssr"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormInput({ label, id, className, error, ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      <label 
        htmlFor={id} 
        className="block text-foreground/60 text-[14px] font-bold tracking-tight ml-1"
      >
        {label}
      </label>
      <div className="relative group">
        <input
          id={id}
          className={cn(
            "w-full px-4 py-3.5 rounded-xl border transition-all duration-300 placeholder:text-muted-foreground/40 text-[15px] focus:outline-none",
            error 
              ? "border-destructive/40 bg-destructive/[0.02] text-destructive focus:ring-4 focus:ring-destructive/5 focus:border-destructive" 
              : "border-border/60 bg-secondary/15 hover:bg-secondary/25 hover:border-foreground/10 focus:bg-background focus:border-foreground/30 focus:ring-4 focus:ring-foreground/[0.03]",
            className
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
      </div>
      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 px-1 animate-in fade-in slide-in-from-top-1 duration-300">
          <WarningCircle size={16} weight="fill" className="text-destructive shrink-0" />
          <p id={`${id}-error`} className="text-destructive text-[13px] font-medium leading-tight" role="alert">
            {error}
          </p>
        </div>
      )}
    </div>
  )
}
