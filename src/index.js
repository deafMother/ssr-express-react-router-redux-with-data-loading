//  the root file for the ppication on the server
// we are running webpack with babel so we can use es6 modules in node as well

// const express = require("express");
// const React = require("react");
// const renderToString = require("react-dom/server").renderToString;
// const Home = require("./client/components/Home").default;
import "babel-polyfill";
import express from "express";
import { matchRoutes } from "react-router-config";
import proxy from "express-http-proxy";

import Routes from "./client/Routets";

import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";

const app = express();

// if any time this route is hit then the renderer server will redirect to the proxy address
app.use(
  "/api",
  proxy("https://react-ssr-api.herokuapp.com/", {
    proxyReqOptDecorator(opts) {
      opts.headers["x-forwarded-host"] = "localhost:3000"; // this proxyReqOptDecorator() is optional depending on the set up of the api server
      return opts;
    },
  })
);
// this is necessary to send the client bundle
app.use(express.static("public"));

app.get("*", (req, res) => {
  // '*' means to handle all routes
  // we need to stipe the cookie send from the browsers and send it to the api server
  const store = createStore(req);

  // some logic to initialize and load data into the store
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      // run the load data function for every component where it is defined
      return route.loadData ? route.loadData(store) : null;
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    // after all the data loading functions are finished we render the  components
    const context = {};
    const content = renderer(req, store, context);
    if (context.url) {
      return res.redirect(301, context.url);
    }
    // context is send to the rendered component as a prop and any changes there will be avaiable here
    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  }); // if can attect a catch to handle errors
});

app.listen(3000, () => {
  console.log("listen on port 3000");
});

// https://react-ssr-api.herokuapp.com/
