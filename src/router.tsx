import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoaderSuspense from "./components/LoaderSuspense";

const MyOwnSquadViewer = lazy(() => import("./components/MyOwnSquadViewer"));
const SquadCreator = lazy(() => import("./components/SquadCreator"));
const PlayerSelection = lazy(() => import("./components/PlayerSelection"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoaderSuspense>
        <MyOwnSquadViewer />
      </LoaderSuspense>
    ),
  },
  {
    path: "/player-selection",
    element: (
      <LoaderSuspense>
        <SquadCreator />
      </LoaderSuspense>
    ),
    children: [
      {
        path: ":teamId",
        element: (
          <LoaderSuspense>
            <PlayerSelection />
          </LoaderSuspense>
        ),
      },
    ],
  },
]);

export default router;
