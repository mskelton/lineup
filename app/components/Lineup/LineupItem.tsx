"use client"

import { Switch } from "@headlessui/react"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Player } from "../../api/players"

export interface LineupItemProps {
  active: boolean
  onActiveChange(value: boolean): void
  player: Player
  position: string | undefined
}

export default function LineupItem({
  active,
  onActiveChange,
  player,
  position,
}: LineupItemProps) {
  return (
    <Switch
      checked={active}
      onChange={onActiveChange}
      className={clsx(
        "relative flex cursor-pointer gap-2 rounded-lg border bg-white p-4 shadow-sm focus:outline-none",
        active ? "border-indigo-600 ring-2 ring-indigo-600" : "border-gray-300"
      )}
    >
      <span className="flex w-full min-w-0 flex-1">
        <span className="flex w-full flex-col text-left">
          <span className="block truncate text-sm font-medium text-gray-900">
            {player.name}
          </span>

          <span className="mt-1 flex items-center text-sm text-gray-500">
            {!active ? (
              "Sitting"
            ) : position ? (
              position
            ) : (
              <span className="h-full w-1/2 animate-pulse rounded-sm bg-slate-100">
                &nbsp;
              </span>
            )}
          </span>

          {/* <span className="mt-6 text-sm font-medium text-gray-900">TODO</span> */}
        </span>
      </span>

      <CheckCircleIcon
        className={clsx(
          "h-5 w-5 flex-shrink-0 text-indigo-600",
          !active && "hidden"
        )}
        aria-hidden="true"
      />

      <span
        className={clsx(
          "pointer-events-none absolute -inset-px rounded-lg border",
          active ? "border-indigo-600" : "border-transparent"
        )}
        aria-hidden="true"
      />
    </Switch>
  )
}
