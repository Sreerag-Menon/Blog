import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, Routes, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AuthLayout, Login } from "./components/index.js";
// import Login from "./pages/Login.jsx";
import Post from "./pages/Post.jsx";
import AllPost from "./pages/AllPost.jsx";

import Signup from "./pages/Signup.jsx";
import EditPost from "./pages/EditPost.jsx";
import AddPost from "./pages/AddPost.jsx";
import Protected from "./components/AuthLayout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <Protected authentication>
            <EditPost />
          </Protected>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
          <Protected authentication>
            <AllPost />
          </Protected>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <Protected authentication>
            <Post />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
