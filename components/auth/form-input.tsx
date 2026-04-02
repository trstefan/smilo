import { InputHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export function FormInput({ label, id, className, error, ...props }: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-muted-foreground text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        className={cn(
          "w-full px-4 py-3 rounded-xl border",
          error ? "border-destructive" : "border-input",
          "focus:outline-none focus:ring-2",
          error ? "focus:ring-destructive/20 focus:border-destructive" : "focus:ring-primary/20 focus:border-primary",
          "transition-all placeholder:text-muted-foreground/50",
          className
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-destructive text-sm" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
