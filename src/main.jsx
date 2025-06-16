import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { CustomProvider } from "rsuite";

import "./../node_modules/rsuite/dist/rsuite.css";
import "rsuite/dist/rsuite.min.css";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux";



import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HelmetProvider>
      <CustomProvider rtl>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            <App />
          </QueryClientProvider>

        </ReduxProvider>
      </CustomProvider>
    </HelmetProvider>
  </BrowserRouter>
);
