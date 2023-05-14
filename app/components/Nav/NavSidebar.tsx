import { DocumentTextIcon, UsersIcon } from "@heroicons/react/24/outline"
import { NavSidebarItem } from "./NavSidebarItem"

const navigation = [
  { href: "/", icon: DocumentTextIcon, name: "Lineup" },
  { href: "/team", icon: UsersIcon, name: "Team" },
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
              {navigation.map((item) => (
                <NavSidebarItem key={item.name} item={item}></NavSidebarItem>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  )
}
