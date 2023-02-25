import { createBrowserRouter } from "react-router-dom";

import { loader as countriesLoader } from "../services/loaders";
import SuspenseWrapper from '../components/SuspenseWrapper';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SuspenseWrapper path="routes/Root" />,
    children: [
      {
        path: "/",
        element: <SuspenseWrapper path="routes/Countries" />,
        loader: countriesLoader,
      },
      {
        path: "/:id",
        element: <SuspenseWrapper path="routes/CountryDetail" />,
      },
    ],
  },
]);

export { router };
