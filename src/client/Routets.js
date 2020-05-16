import React from "react";

import HomePage from "./pages/HomePage";
import UsersListPage from "./pages/UsersListPage";

// a we are using server side data loading
// so we must use an array of paths and not the traditional react router approach
// each object represents one route
export default [
  {
    path: "/",
    ...HomePage,
    exact: true,
  },
  {
    path: "/users",
    ...UsersListPage,
  },
];
