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
      {
        path: "",
        index: true,
        element: (
          <h3 style={{ textAlign: "center" }}>
            Select one team to see its members.
          </h3>
        ),
      },
    ],
  },
]);

export default router;
