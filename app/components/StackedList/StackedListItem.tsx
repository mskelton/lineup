import { ChevronRightIcon } from "@heroicons/react/24/outline"

export interface StackedListItemProps {
  children?: React.ReactNode
  href: string
  subtitle: string
  title: string
}

export default function StackedListItem({
  children,
  href,
  subtitle,
  title,
}: StackedListItemProps) {
  return (
    <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
      <div className="flex gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            <a href={href}>
              <span className="absolute inset-x-0 -top-px bottom-0" />
              {title}
            </a>
          </p>

          {subtitle ? (
            <p className="mt-1 flex text-xs leading-5 text-gray-500">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        {children}

        <ChevronRightIcon
          className="h-5 w-5 flex-none text-gray-400"
          aria-hidden="true"
        />
      </div>
    </li>
  )
}
