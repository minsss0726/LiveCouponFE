import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import EventListPage from "../pages/EventList";
import LoginPage from "../pages/Login";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "events",
        element: <EventListPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

export default routes;
