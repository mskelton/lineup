import "./globals.css"
import Nav from "./components/Nav"

export const metadata = {
  description: "Baseball lineup generator",
  title: "Lineup",
}

export interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        <Nav />

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </body>
    </html>
  )
}
