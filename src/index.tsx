import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root from "./pages/root";
import ErrorPage from "./errror-page";
import Create, { formDataProps } from "./pages/create";
import Details from "./pages/details";
import Search from "./pages/search";
import Edit from "./pages/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Search />,
        loader: () => {
          const users = localStorage.getItem("users");
          const datas: formDataProps[] = users ? JSON.parse(users) : [];
          return datas;
        },
      },
      {
        path: "create",
        element: <Create />,
      },
      {
        path: "edit/:userId",
        element: <Edit />,
        loader: ({ params }) => {
          const users = localStorage.getItem("users")
            ? JSON.parse(localStorage.getItem("users")!)
            : [];
          const result =
            users.find(({ id }: { id: string }) => {
              return id == params.userId;
            }) ?? null;
          return result;
        },
      },
      {
        path: "details/:userId",
        element: <Details />,
        //todo: loader 컴포넌트화
        loader: ({ params }) => {
          const users = localStorage.getItem("users")
            ? JSON.parse(localStorage.getItem("users")!)
            : [];
          const result =
            users?.find(({ id }: { id: string }) => id == params.userId) ??
            null;
          return result;
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
