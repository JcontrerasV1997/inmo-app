import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { InmoApp } from "./components/InmoApp";

// const FirebaseContext = React.createContext();

ReactDOM.render(
  <React.StrictMode>
      <InmoApp />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
