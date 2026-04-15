import type * as React from "react"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "ghost" | "slim"
  size?: "default" | "sm" | "lg"
  onClick?: () => void
  type?: "button" | "submit"
  href?: string
  disabled?: boolean
  gradient?: string
}

export default function AnimatedButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  href,
  disabled = false,
}: AnimatedButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-2.5",
    lg: "px-8 py-3 text-lg",
    slim: "px-6 py-2 text-sm",
  }

  const variantClasses = {
    default: "bg-white text-black hover:bg-gray-100",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
    ghost: "bg-transparent hover:bg-gray-100",
    slim: "bg-white text-black hover:bg-gray-100",
  }

  const buttonContent = (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium transition-colors duration-200",
        sizeClasses[size] ?? sizeClasses["default"],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {children}
    </span>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block">
      {buttonContent}
    </button>
  )
}
