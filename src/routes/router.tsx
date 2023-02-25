import { createBrowserRouter } from "react-router-dom";

import { countriesLoader, countryDetailLoader } from "../loaders";

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
        loader: countryDetailLoader,
      },
      {
        path: "/blog",
        element: <span>Blog page</span>,
      },
      {
        path: "/profile",
        element: <span>Profile page</span>,
      },
    ],
  },
], {
  basename: "/react-app/"
});

export { router };
