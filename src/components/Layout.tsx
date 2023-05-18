import { Outlet } from "react-router-dom"
import Nav from "components/Nav"

export default function Layout() {
  return (
    <>
      <Nav />

      <main className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  )
}
