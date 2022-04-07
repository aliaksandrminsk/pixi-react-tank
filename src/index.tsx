import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import store, { StoreContext } from "./store";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </React.StrictMode>
  );
}
