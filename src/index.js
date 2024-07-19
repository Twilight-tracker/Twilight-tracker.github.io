import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStorage } from "./storage/storage";
import "./index.css";

configureStorage();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
