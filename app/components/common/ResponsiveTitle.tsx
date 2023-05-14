export interface ResponsiveTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export default function ResponsiveTitle(props: ResponsiveTitleProps) {
  return (
    <h1
      className="sr-only text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:not-sr-only sm:mb-8"
      {...props}
    />
  )
}
