import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Root from "./pages/Root";
import Dashboard from "./pages/Dashboard";
import Calculator from "./pages/Calculator";
import Auth from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/calculator", element: <Calculator /> },
      { path: "/", element: <Auth /> },
    ],
  },
]);

export default router;
