import Title from "./Title"

export interface ResponsiveTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export default function ResponsiveTitle(props: ResponsiveTitleProps) {
  return (
    <div className="sr-only sm:not-sr-only">
      <Title {...props} />
    </div>
  )
}
