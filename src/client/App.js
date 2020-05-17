import React from "react";
import { renderRoutes } from "react-router-config";

// route routes are the components matched by the routes component depending on the path
const App = ({ route }) => {
  return (
    <div>
      <h1>Im a header</h1>
      {renderRoutes(route.routes)}
    </div>
  );
};

export default {
  component: App,
};
