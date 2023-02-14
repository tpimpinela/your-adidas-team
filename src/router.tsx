import { createBrowserRouter } from "react-router-dom";
import MyOwnSquadViewer from "./components/MyOwnSquadViewer";
import PlayerSelection from "./components/PlayerSelection";
import SquadCreator from "./components/SquadCreator";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyOwnSquadViewer />,
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
