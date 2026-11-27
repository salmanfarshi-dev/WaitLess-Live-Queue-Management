
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { Provider, useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";
import { store } from "./app/store";
import { restoreSession } from "./features/auth/authSlice";
import muiTheme from "./theme/muiTheme";

import "./i18n";
import "./index.css";

// Prevent duplicate session restoration in React StrictMode
let sessionRestoreStarted = false;

function AppInitializer() {
  const dispatch = useDispatch();
  const initialized = useSelector(
    (state) => state.auth.initialized
  );

  useEffect(() => {
    if (!sessionRestoreStarted) {
      sessionRestoreStarted = true;
      dispatch(restoreSession());
    }
  }, [dispatch]);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm font-medium text-muted">
          Loading WaitLess...
        </p>
      </div>
    );
  }

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <AppInitializer />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
