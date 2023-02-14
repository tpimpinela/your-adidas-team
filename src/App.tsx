import { RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ValidationMessage from "./components/ValidationMessage";
import { MyOwnSquadContextProvider } from "./contexts/MyOwnSquad.context";
import router from "./router";

function App() {
  return (
    <MyOwnSquadContextProvider>
      <Header />
      <main>
        <ValidationMessage />
        <RouterProvider router={router} />
      </main>
    </MyOwnSquadContextProvider>
  );
}

export default App;
