import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import { ManageUser } from "./components/Admin/Content/ManageUser";
import DashBoard from "./components/Admin/Content/DashBoard";
import "sonner/dist/styles.css";
import { Toaster } from "sonner";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Toaster
      position="top-right"
      theme="light"
      richColors
      expand
      duration={4000}
      visibleToasts={5}
      closeButton
      offset={16}
      gap={8}
      toastOptions={{}}
      icons={{}}
    />
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="/users" element={<User />} />
      </Route>

      <Route path="/admins" element={<Admin />}>
        <Route index element={<DashBoard />} />
        <Route path="manage-user" element={<ManageUser />} />
      </Route>

       <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Routes>
  </BrowserRouter>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
