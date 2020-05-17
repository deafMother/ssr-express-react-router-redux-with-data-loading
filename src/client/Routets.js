import React from "react";

import App from "./App";
import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";

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
    ],
  },
];
