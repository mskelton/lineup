import { tv } from "tailwind-variants"

export const button = tv({
  base: "rounded-md text-xs font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
  variants: {
    color: {
      indigo:
        "bg-indigo-600 focus-visible:outline-indigo-600 hover:bg-indigo-500",
    },
    size: {
      xs: "text-sm px-2 py-1",
      sm: "text-sm px-2 py-1",
      md: "text-sm px-2.5 py-1.5",
      lg: "text-sm px-3 py-2",
      xl: "text-sm px-3.5 py-2.5",
    },
  },
  defaultVariants: {
    color: "indigo",
    size: "md",
  },
})
