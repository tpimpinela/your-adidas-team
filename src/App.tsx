import { RouterProvider } from "react-router-dom";
import "./App.css";
import GlobalLoader from "./components/GlobalLoader/GlobalLoader";
import Header from "./components/Header";
import ValidationMessage from "./components/ValidationMessage";
import ContextProvider from "./contexts/ContextProvider";
import router from "./router";

function App() {
  return (
    <ContextProvider>
      <Header />
      <main>
        <ValidationMessage />
        <RouterProvider router={router} />
      </main>
      <GlobalLoader />
    </ContextProvider>
  );
}

export default App;
