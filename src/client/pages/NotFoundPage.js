import React from "react";

//staticCotext is the context passed by static router only available during the server render side

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;
  return <h1>Opps, route not found</h1>;
};

export default {
  component: NotFoundPage,
};
