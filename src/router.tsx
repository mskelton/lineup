import { createBrowserRouter, Outlet } from "react-router-dom"
import Layout from "components/Layout"
import Home from "routes/Home"
import Player from "routes/Player"
import Players from "routes/Players"
import Roster from "routes/Roster"
import Rosters from "routes/Rosters"

export const router = createBrowserRouter([
  {
    children: [
      { element: <Home />, index: true },
      {
        children: [
          { element: <Rosters />, index: true },
          { element: <Roster />, path: ":id" },
        ],
        element: <Outlet />,
        path: "rosters",
      },
      {
        children: [
          { element: <Players />, index: true },
          { element: <Player />, path: ":id" },
        ],
        element: <Outlet />,
        path: "players",
      },
    ],
    element: <Layout />,
  },
])
