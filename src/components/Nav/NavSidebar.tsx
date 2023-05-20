import {
  DocumentTextIcon,
  RectangleGroupIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import { NavSidebarItem } from "./NavSidebarItem"

export const navItems = [
  { href: "/", icon: DocumentTextIcon, name: "Lineup" },
  { href: "/rosters", icon: RectangleGroupIcon, name: "Rosters" },
  { href: "/players", icon: UserGroupIcon, name: "Players" },
] as const

export interface NavSidebarProps {
  onClose(): void
}

export function NavSidebar({ onClose }: NavSidebarProps) {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
      <div className="flex h-16 shrink-0 items-center">
        <img
          alt="Your Company"
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=white"
        />
      </div>

      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7" role="list">
          <li>
            <ul className="-mx-2 space-y-1" role="list">
              {navItems.map((item) => (
                <NavSidebarItem key={item.name} item={item} onClick={onClose} />
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
