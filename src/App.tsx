import type React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./router/routes";
import "./App.css";

function App(): React.ReactElement {
  return <RouterProvider router={routes} />;
}

export default App;
