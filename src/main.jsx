import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { CustomProvider } from "rsuite";

import "./../node_modules/rsuite/dist/rsuite.css";
import "rsuite/dist/rsuite.min.css";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CustomProvider rtl>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </ReduxProvider>
    </CustomProvider>
  </BrowserRouter>
);
