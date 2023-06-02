import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline"
import clsx from "clsx"
import { formatOrdinal } from "utils/format"

const styles = {
  icon: "h-4 w-4",
}

export interface InningProps {
  inning: number
  top: boolean
}

export default function Inning({ inning, top }: InningProps) {
  return (
    <div className="flex items-center">
      <span className="text-xl">{formatOrdinal(inning)}</span>
      <svg
        fill="none"
        height="36"
        viewBox="0 0 24 24"
        width="36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={top ? "fill-yellow-500" : "fill-gray-200"}
          clipRule="evenodd"
          d="M11.4697 4.71967C11.7626 4.42678 12.2374 4.42678 12.5303 4.71967L16.2803 8.46967C16.4948 8.68417 16.559 9.00676 16.4429 9.28701C16.3268 9.56727 16.0533 9.75 15.75 9.75H8.25C7.94665 9.75 7.67318 9.56727 7.55709 9.28701C7.441 9.00676 7.50517 8.68417 7.71967 8.46967L11.4697 4.71967Z"
          fillRule="evenodd"
        />
        <path
          className={!top ? "fill-yellow-500" : "fill-gray-200"}
          clipRule="evenodd"
          d="M7.55709 14.713C7.67318 14.4327 7.94665 14.25 8.25 14.25H15.75C16.0533 14.25 16.3268 14.4327 16.4429 14.713C16.559 14.9932 16.4948 15.3158 16.2803 15.5303L12.5303 19.2803C12.2374 19.5732 11.7626 19.5732 11.4697 19.2803L7.71967 15.5303C7.50517 15.3158 7.441 14.9932 7.55709 14.713Z"
          fillRule="evenodd"
        />
      </svg>
    </div>
  )
}
