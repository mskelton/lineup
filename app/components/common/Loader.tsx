import clsx from "clsx"

export interface LoaderProps {
  className?: string
}

export function Loader({ className }: LoaderProps) {
  return (
    <div
      className={clsx("block animate-pulse rounded-lg bg-gray-100", className)}
    />
  )
}
