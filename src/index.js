import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { EventId } from "./ContextAPI/EventId";
// import { EventIdContext } from "./ContextAPI/EventId";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <EventId>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </EventId>
);
