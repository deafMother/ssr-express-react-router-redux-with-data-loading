// render the react app and return the string

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config"; // this is used for routing if we do server side data fetching
import serialize from "serialize-javascript"; // works like JSON stringfy but prevents xss attackks
import Routes from "../client/Routets";

export default (req, store, context) => {
  /*
  note: we are sending HTML code and not states and no JS like in normal react apps
  so we need to hydrate  and have sencond client bundle
  */
  // context: will be passed as a prop down to all its rendered components
  // static router must be given the  current url
  // note: when a particular page(component) is being rendered server side the life cycle of
  // that component doesnt execute as we are fetching only the html
  // only when we send the client js bundle then only the component we
  // execute like a normal react app,  we can test it by removing the client bundle script
  // we need to use additional settings to make this behaviour in the server side
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  /*
    add html script tp inject the client bundle js and the state into the html content above
  */
  const html = `
  <html>
    <head>
    </head>
    <body>
      <div id="root">${content}</div>
      <script>
        window.INITIAL_STATE=${serialize(store.getState())}
      </script>
       <script src="bundle.js"></script>
    </body>  

  </html>
  `;

  return html;
};
