import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import EventListPage from "../pages/EventList";
import LoginPage from "../pages/Login";
import EventDetailsPage from "../pages/EventDetails";
import AdminPage from "../pages/Admin";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "events",
        element: <EventListPage />,
      },
      {
        path: "events/:eventId",
        element: <EventDetailsPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
]);

export default routes;
