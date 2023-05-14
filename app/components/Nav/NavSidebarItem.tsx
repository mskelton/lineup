import clsx from "clsx"

export interface NavSidebarItem {
  href: string
  icon: React.ForwardRefExoticComponent<React.SVGAttributes<SVGSVGElement>>
  name: string
}

export interface NavSidebarItemProps {
  item: NavSidebarItem
}

export function NavSidebarItem({ item }: NavSidebarItemProps) {
  // TODO
  const current = false

  return (
    <li>
      <a
        href={item.href}
        className={clsx(
          current
            ? "bg-indigo-700 text-white"
            : "text-indigo-200 hover:bg-indigo-700 hover:text-white",
          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
        )}
      >
        <item.icon
          className={clsx(
            current ? "text-white" : "text-indigo-200 group-hover:text-white",
            "h-6 w-6 shrink-0"
          )}
          aria-hidden="true"
        />

        {item.name}
      </a>
    </li>
  )
}
