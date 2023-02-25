import "./assets/index.css";

import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import queryClient from "./rquery/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import { router } from './routes/router';
import { StrictMode } from 'react';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
