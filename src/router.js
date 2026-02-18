import { createBrowserRouter } from "react-router-dom";

import Background from "./components/core/Background";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import ObjectivesPage from "./pages/ObjectivesPage";
import NewGamePage from "./pages/NewGamePage";
import GamePage from "./pages/GamePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Background />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "objectives",
        element: <ObjectivesPage />,
      },
      {
        path: "newGame",
        element: <NewGamePage />,
      },
      {
        path: "game",
        element: <GamePage />,
      },
    ],
  },
]);
