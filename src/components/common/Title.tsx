import { twMerge } from "tailwind-merge"

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export default function Title({ className, ...props }: TitleProps) {
  return (
    <h1
      className={twMerge(
        "text-3xl font-bold leading-tight tracking-tight text-gray-900",
        className
      )}
      {...props}
    />
  )
}
