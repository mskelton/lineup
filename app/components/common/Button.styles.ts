import { tv } from "tailwind-variants"

export const button = tv({
  base: "text-xs font-semibold outline-none ra-focus:ring-2 ra-focus:ring-offset-2 relative",
  slots: {
    content: "",
    spinner: "h-1/2",
    spinnerContainer: "absolute inset-0 flex items-center justify-center",
  },
  variants: {
    size: {
      xs: "text-sm px-2 py-1",
      sm: "text-sm px-2 py-1",
      md: "text-sm px-2.5 py-1.5",
      lg: "text-sm px-3 py-2",
      xl: "text-sm px-3.5 py-2.5",
    },
    variant: {
      primary: "bg-indigo-600 ra-focus:ring-indigo-600 hover:bg-indigo-500",
      secondary:
        "bg-white text-gray-900 border-gray-300 ra-focus:ring-indigo-600 hover:bg-gray-50",
      danger: "bg-red-600 ra-focus:ring-red-600 hover:bg-red-500",
      link: "text-indigo-600 hover:text-indigo-500 hover:underline p-0",
    },
    isDisabled: {
      true: "cursor-not-allowed bg-slate-300/80 pointer-events-none",
    },
    isLoading: {
      true: {
        base: "cursor-wait",
        content: "invisible",
      },
      false: {
        spinner: "hidden",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
  compoundVariants: [
    {
      variant: ["primary", "secondary", "danger"],
      className: "rounded-md border shadow-sm",
    },
    {
      variant: ["primary", "danger"],
      className: "text-white border-transparent",
    },
  ],
})
