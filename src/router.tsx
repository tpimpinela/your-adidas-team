import { createBrowserRouter } from "react-router-dom";
import PlayerSelection from "./components/PlayerSelection";
import SquadCreator from "./components/SquadCreator";

const router = createBrowserRouter([
  {
    path: "/",
    // TO DO: Main route
    element: <h1>Hello world</h1>,
  },
  {
    path: "/player-selection",
    element: <SquadCreator />,
    children: [
      {
        path: ":teamId",
        element: <PlayerSelection />,
      },
    ],
  },
]);

export default router;
