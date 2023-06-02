import { SparklesIcon } from "@heroicons/react/24/outline"
import Alert from "components/common/Alert"
import { formatOrdinal } from "utils/format"
import type { Analysis } from "./worker"

const titles = {
  good: "Not the best, but not the worst",
  great: "Awesome, this lineup is great!",
  poor: "Yikes, this lineup could use some work!",
}

const variants = {
  good: "warning",
  great: "success",
  poor: "error",
} as const

export interface AnalysisSummaryProps {
  analysis: Analysis
}

function AnalysisSummary({ analysis }: AnalysisSummaryProps) {
  const score =
    analysis.max <= 2 ? "great" : analysis.max <= 4 ? "good" : "poor"
  const content =
    analysis.max === 1 ? (
      <>
        their 1<sup>st</sup> choice
      </>
    ) : (
      <>
        a position between their {analysis.min}
        <sup>{formatOrdinal(analysis.min, true)}</sup> and {analysis.max}
        <sup>{formatOrdinal(analysis.max, true)}</sup> choices
      </>
    )

  return (
    <Alert
      title={
        <>
          <span>{titles[score]}</span>
          <SparklesIcon className="h-5 w-5" />
        </>
      }
      variant={variants[score]}
    >
      With a total score of {analysis.score}, each player received {content}.
    </Alert>
  )
}

export default AnalysisSummary
