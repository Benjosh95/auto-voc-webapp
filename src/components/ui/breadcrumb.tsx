import * as React from "react"
import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    label: string
    href?: string
  }[]
}

export function Breadcrumb({ items, className, ...props }: BreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb"
      className={cn("flex", className)} 
      {...props}
    >
      <ol className="flex items-center">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="mx-2 h-4 w-4 text-[#003B5C]/40" />
            )}
            {item.href ? (
              <Link
                to={item.href}
                className="text-[#003B5C]/60 hover:text-[#003B5C] transition-colors font-medium"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-[#003B5C]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
} 