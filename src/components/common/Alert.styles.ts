import { tv } from "tailwind-variants"

export const alert = tv({
  base: "w-full rounded-md bg-green-50 px-4 py-3 text-green-700 ring-1 ring-inset ring-green-600/20",
  slots: {
    title: "mb-1 flex items-center justify-between text-base font-semibold",
    content: "text-xs font-medium",
  },
  variants: {
    variant: {
      error: "bg-red-50 text-red-700 ring-red-600/20",
      info: "bg-blue-50 text-blue-700 ring-blue-600/20",
      success: "bg-green-50 text-green-700 ring-green-600/20",
      warning: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
    },
  },
  defaultVariants: {
    variant: "success",
  },
})
