import { createBrowserRouter } from "react-router-dom";

import Background from "./components/Layout/Background";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import CardsPage from "./pages/CardsPage";
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
        path: "cards",
        element: <CardsPage />,
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
