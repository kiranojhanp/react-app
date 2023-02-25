import { createBrowserRouter } from "react-router-dom";

import { loader as countriesLoader } from "../services/loaders";

import Root from "./Root";
import Countries from "./Countries";
import CountryDetail from "./CountryDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Countries />,
        loader: countriesLoader,
      },
      {
        path: "/:id",
        element: <CountryDetail />,
      },
    ],
  },
], {
  basename: "/react-app"
});

export { router };
