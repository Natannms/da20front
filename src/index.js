import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import CreateContact from "./views/CreateContact";
import EditPhone from "./views/EditPhone";
import EditContact from "./views/EditContact";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create-contact" element={<CreateContact />} />
        <Route path="/edit-phone" element={<EditPhone />} />
        <Route path="/edit-contact" element={<EditContact />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
