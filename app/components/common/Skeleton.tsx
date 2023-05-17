import clsx from "clsx"

export interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "block w-full animate-pulse rounded-lg bg-gray-100",
        className
      )}
    />
  )
}
