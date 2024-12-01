// frontend/src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import configureStore from "./redux/store";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import "./index.css";
import { csrfFetch, restoreCSRF } from "./redux/csrf";
import { ThemeProvider } from "./context/ThemeContext";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF()
  window.csrfFetch = csrfFetch
  window.store = store;
  window.sessionActions = sessionActions;
}

// Dispatch authenticate action when the app starts
// store.dispatch(sessionActions.thunkAuthenticate());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);
