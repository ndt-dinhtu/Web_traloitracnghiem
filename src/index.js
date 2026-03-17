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
import { Provider } from "react-redux";
import "nprogress/nprogress.css";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import ListQuizz from "./components/User/ListQuizz";
import NotFound from "./components/NotFound/NotFound";
import DetailQuiz from "./components/User/DetailQuiz";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/users" element={<ListQuizz />} />
          </Route>
          <Route path="/quiz/:id" element={<DetailQuiz />} />

          <Route path="/admins" element={<Admin />}>
            <Route index element={<DashBoard />} />
            <Route path="manage-user" element={<ManageUser />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
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
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
