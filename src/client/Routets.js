import React from "react";

import App from "./App";
import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminPage from "./pages/AdminPage";

// a we are using server side data loading
// so we must use an array of paths and not the traditional react router approach
// each object represents one route
export default [
  {
    ...App, // the app will always  be displayed to the screen as we have not tied any path to it
    routes: [
      {
        path: "/",
        ...HomePage,
        exact: true,
      },
      {
        path: "/users",
        ...UsersListPage,
      },
      {
        path: "/admins",
        ...AdminPage,
      },
      {
        ...NotFoundPage, // if unknown path is requested then this component will be served
      },
    ],
  },
];
