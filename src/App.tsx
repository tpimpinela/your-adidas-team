import { RouterProvider } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import router from "./router";

function App() {
  return (
    <>
      <Header />
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  );
}

export default App;
