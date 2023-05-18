import clsx from "clsx"
import { NavLink } from "react-router-dom"

export interface NavSidebarItem {
  href: string
  icon: React.ForwardRefExoticComponent<React.SVGAttributes<SVGSVGElement>>
  name: string
}

export interface NavSidebarItemProps {
  item: NavSidebarItem
  onClick(): void
}

export function NavSidebarItem({ item, onClick }: NavSidebarItemProps) {
  return (
    <li>
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          clsx(
            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors",
            isActive
              ? "bg-indigo-700 text-white"
              : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
          )
        }
        onClick={onClick}
      >
        <item.icon
          className="h-6 w-6 shrink-0 text-current"
          aria-hidden="true"
        />

        {item.name}
      </NavLink>
    </li>
  )
}
