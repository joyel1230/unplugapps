import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Header from "../components/tables/Header";
import Detail from "../components/tables/Detail";
import Items from "../components/tables/Items";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Header />,
      },
      {
        path: "/details",
        element: <Detail />,
      },
      {
        path: "/items",
        element: <Items />,
      },
    ],
  },
]);

export default router;
