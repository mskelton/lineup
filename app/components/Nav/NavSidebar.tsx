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
]

export function NavSidebar() {
  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=white"
          alt="Your Company"
        />
      </div>

      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navItems.map((item) => (
                <NavSidebarItem key={item.name} item={item}></NavSidebarItem>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
