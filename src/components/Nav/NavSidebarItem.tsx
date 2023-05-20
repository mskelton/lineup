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
        className={({ isActive }) =>
          clsx(
            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors",
            isActive
              ? "bg-indigo-700 text-white"
              : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
          )
        }
        onClick={onClick}
        to={item.href}
      >
        <item.icon
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-current"
        />

        {item.name}
      </NavLink>
    </li>
  )
}
